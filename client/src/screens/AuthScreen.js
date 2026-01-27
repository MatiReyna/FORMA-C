import { useState, useRef, useEffect, useCallback, memo, forwardRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Animated, Alert, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { useFormValidation } from '../hooks';
import { debounce } from '../utils';
import { DEV_USER, COLORS } from '../constants';
import { TYPOGRAPHY } from '../constants/typography';
import { AUTH_MESSAGES } from '../constants/authMessages';
import authService from '../services/authService';
import PasswordRequirements from '../components/PasswordRequirements';
import logo from '../../assets/image/logo.png';

const EmailField = memo(forwardRef(({
    value,
    onChangeText,
    onBlur,
    onFocus,
    error,
    isValid,
    placeholder,
    editable,
    returnKeyType,
    onSubmitEditing,
    accessibilityLabel
}, ref) => {
    
    const [ isFocused, setIsFocused ] = useState(false);

    const getBorderColor = () => {
        if (error) return COLORS.error;
        if (isValid && value && !error) return COLORS.success;
        if (isFocused && !error) return COLORS.primary;
        return COLORS.border;
    }

    const getBackgroundColor = () => {
        if (error) return `${ COLORS.error }08`;
        if (isFocused && !error) return `${ COLORS.primary }08`;
        return COLORS.surfaceSecondary;
    }

    const handleFocus = () => {
        setIsFocused(true);
        if (onFocus) onFocus();
    }

    const handleBlur = () => {
        setIsFocused(false);
        if (onBlur) onBlur();
    }

    return (
        <View style={ styles.fieldContainer }>
            <View style={ styles.fieldHeader }>
                <Ionicons name='mail-outline' size={ 18 } color={ COLORS.primary } />
                <Text style={ styles.fieldLabel }>{ AUTH_MESSAGES.EMAIL_LABEL }</Text>
                {
                    isValid && value && !error && (
                        <Ionicons name='checkmark-circle' size={ 16 } color={ COLORS.success } style={ styles.successIcon } />
                    )
                }
            </View>
            <View
                style={[
                    styles.textInputWrapper,
                    error && styles.textInputWrapperError,
                    isValid && value && !error && styles.textInputWrapperValid,
                    {
                        borderColor: getBorderColor(),
                        backgroundColor: getBackgroundColor()
                    }
                ]}
            >
                <TextInput
                    ref={ ref }
                    style={ styles.textInput }
                    placeholder={ placeholder || 'tu@email.com' }
                    placeholderTextColor={ COLORS.textTertiary }
                    value={ value }
                    onChangeText={ onChangeText }
                    onFocus={ handleFocus }
                    onBlur={ handleBlur }
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoComplete='email'
                    editable={ editable }
                    returnKeyType={ returnKeyType }
                    onSubmitEditing={ onSubmitEditing }
                    accessibilityLabel={ accessibilityLabel }
                    accessibilityHint={ error || undefined }
                    accessibilityLiveRegion='polite'
                />
            </View>
            {
                error && (
                    <View style={ styles.errorContainer }>
                        <Ionicons name='alert-circle' size={ 14 } color={ COLORS.error } />
                        <Text style={ styles.errorText }>{ error }</Text>
                    </View>
                )
            }
        </View>
    )
}));

const PasswordField = memo(forwardRef(({
    label,
    value,
    onChangeText,
    onBlur,
    onFocus,
    onValidation,
    error,
    isValid,
    showPassword,
    onToggleVisibility,
    placeholder,
    autoComplete,
    editable,
    returnKeyType,
    onSubmitEditing,
    accessibilityLabel,
    confirmPassword,
    isConfirmField = false
}, ref) => {

    const [ isFocused, setIsFocused ] = useState(false);

    const passwordsMatch = isConfirmField && confirmPassword && value === confirmPassword && value.length > 0;

    const getBorderColor = () => {
        if (error) return COLORS.error;
        if (passwordsMatch) return COLORS.success;
        if (isValid && value && !error) return COLORS.success;
        if (isFocused && !error) return COLORS.primary;
        return COLORS.border;
    }

    const getBackgroundColor = () => {
        if (error) return `${ COLORS.error }08`;
        if (passwordsMatch) return `${ COLORS.success }08`;
        if (isFocused && !error) return `${ COLORS.primary }08`;
        return COLORS.surfaceSecondary;
    }

    const handleChange = (text) => {
        onChangeText(text);
    }

    const handleFocus = () => {
        setIsFocused(true);
        if (onFocus) onFocus();
    }

    const handleBlur = () => {
        setIsFocused(false);
        if (onBlur) onBlur();
    }

    return (
        <View style={ styles.fieldContainer }>
            <View style={ styles.fieldHeader }>
                <Ionicons name='lock-closed-outline' size={ 18 } color={ COLORS.primary } />
                <Text style={ styles.fieldLabel }>{ label }</Text>
                {
                    isValid && value && !error && (
                        <Ionicons name='checkmark-circle' size={ 16 } color={ COLORS.success } style={ styles.successIcon } />
                    )
                }
                {
                    isConfirmField && passwordsMatch && (
                        <View style={ styles.matchIndicator }>
                            <Ionicons name='checkmark-circle' size={ 16 } color={ COLORS.success } />
                            <Text style={ styles.matchText }>They agree</Text>
                        </View>
                    )
                }
            </View>
            <View
                style={[
                    styles.passwordContainer,
                    error && styles.passwordContainerError,
                    isValid && value && !error && styles.passwordContainerValid,
                    passwordsMatch && styles.passwordContainerMatch,
                    {
                        borderColor: getBorderColor(),
                        backgroundColor: getBackgroundColor()
                    }
                ]}
            >
                <TextInput
                    ref={ ref }
                    style={ styles.passwordInput }
                    placeholder={ placeholder }
                    placeholderTextColor={ COLORS.textTertiary }
                    value={ value }
                    onChangeText={ handleChange }
                    onFocus={ handleFocus }
                    onBlur={ handleBlur }
                    secureTextEntry={ !showPassword }
                    autoCapitalize='none'
                    autoComplete={ autoComplete }
                    editable={ editable }
                    returnKeyType={ returnKeyType }
                    onSubmitEditing={ onSubmitEditing }
                    accessibilityLabel={ accessibilityLabel }
                    accessibilityHint={ error || undefined }
                />
                <Pressable
                    onPress={ () => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        onToggleVisibility();
                    } }
                    style={ styles.eyeButton }
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    accessibilityLabel={ AUTH_MESSAGES.ACCESSIBILITY_TOGGLE_PASSWORD }
                    accessibilityRole='button'
                >
                    <Ionicons
                        name={ showPassword ? 'eye-off-outline' : 'eye-outline' }
                        size={ 20 }
                        color={ COLORS.textSecondary }
                    />
                </Pressable>
            </View>
            {
                error && (
                    <View style={ styles.errorContainer }>
                        <Ionicons name='alert-circle' size={ 14 } color={ COLORS.error } />
                        <Text style={ styles.errorText }>{ error }</Text>
                    </View>
                )
            }
        </View>
    )
}));

export default function AuthScreen({ navigation }) {

    const insets = useSafeAreaInsets();
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const [ previousEmail, setPreviousEmail ] = useState('');
    const [ isLogin, setIsLogin ] = useState(true);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ cardAnim ] = useState(new Animated.Value(1));

    const {
        errors,
        validateEmail,
        validatePassword,
        validateConfirmPassword,
        setFieldError,
        clearErrors,
        validateAll
    } = useFormValidation();

    const debouncedEmailValidation = useCallback(
        debounce((text) => {
            const error = validateEmail(text);
            setFieldError('email', error);
        }, 300),
        [ validateEmail, setFieldError ]
    );

    const debouncedPasswordValidation = useCallback(
        debounce((text) => {
            const error = validatePassword(text);
            setFieldError('password', error);
        }, 300),
        [ validatePassword, setFieldError ]
    );

    const debouncedConfirmPasswordValidation = useCallback(
        debounce((text, currentPassword) => {
            const error = validateConfirmPassword(text, currentPassword);
            setFieldError('confirmPassword', error);
        }, 300),
        [ validateConfirmPassword, setFieldError ]
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLogin) {
                emailInputRef.current?.focus();
            } else {
                passwordInputRef.current?.focus();
            }
        })
    }, [ isLogin ])

    useEffect(() => {
        Animated.sequence([
            Animated.timing(cardAnim, {
                toValue: 0.98,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(cardAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            })
        ]).start()
    }, [ isLogin ])

    const isEmailValid = email && !errors.email && validateEmail(email) === null;
    const isPasswordValid = password && !errors.password && validatePassword(password) === null;
    const isConfirmPasswordValid = confirmPassword && !errors.confirmPassword &&
        validateConfirmPassword(confirmPassword, password) === null;

    const validateForm = () => {
        return validateAll({ email, password, confirmPassword }, isLogin);
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }

        if (isLoading) return;

        setIsLoading(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        try {
            const result = isLogin
                ? await authService.login(email, password)
                : await authService.register(email, password);

            if (result.success) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                if (isLogin) {
                    navigation.replace('MainApp');
                } else {
                    Alert.alert('Success', AUTH_MESSAGES.REGISTER_SUCCESS, [
                        {
                            text: 'Get Started',
                            onPress: () => navigation.replace('MainApp')
                        }
                    ]);
                }
            } else {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                const errorMessage = result.message ||
                    (isLogin ? AUTH_MESSAGES.INVALID_CREDENTIALS : AUTH_MESSAGES.REGISTER_ERROR);
                Alert.alert(
                    isLogin ? AUTH_MESSAGES.LOGIN_FAILED : AUTH_MESSAGES.REGISTER_FAILED,
                    errorMessage
                )
            }
        } catch (error) {
            console.error(`Error during ${ isLogin ? 'login' : 'registration' }:`, error);
            Alert.alert('Error', error.message || AUTH_MESSAGES.GENERIC_ERROR);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } finally {
            setIsLoading(false);
        }
    }

    const toggleMode = () => {
        if (isLoading) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        const emailToKeep = email || previousEmail;
        setPreviousEmail(emailToKeep);

        setIsLogin(!isLogin);
        clearErrors();
        setPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowConfirmPassword(false);

        if (!emailToKeep && previousEmail) {
             setTimeout(() => {
                setEmail(previousEmail);
             }, 100)
        }
    };

    const handleBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.replace('Onboarding');
    };

    const handleUseDemo = () => {
        if (isLoading) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        Animated.sequence([
            Animated.timing(cardAnim, {
                toValue: 0.99,
                duration: 80,
                useNativeDriver: true
            }),
            Animated.timing(cardAnim, {
                toValue: 1,
                duration: 80,
                useNativeDriver: true
            })
        ]).start();

        setEmail(DEV_USER.email);
        setPassword(DEV_USER.password);
        clearErrors();

        setTimeout(() => {
            const emailError = validateEmail(DEV_USER.email);
            const passwordError = validatePassword(DEV_USER.password);
            setFieldError('email', emailError);
            setFieldError('password', passwordError);
        }, 100)
    };

    return (
        <View style={ styles.container }>
            <Pressable
                onPress={ handleBack }
                style={({ pressed }) => [
                    styles.backButton,
                    { top: insets.top + 10 },
                    pressed && styles.backButtonPressed
                ]}
                accessibilityLabel={ AUTH_MESSAGES.ACCESSIBILITY_BACK }
                accessibilityRole='button'
            >
                <Ionicons name='arrow-back' size={ 18 } color={ COLORS.textSecondary } />
                <Text style={ styles.backButtonText }>{ AUTH_MESSAGES.BACK }</Text>
            </Pressable>

            <ScrollView
                contentContainerStyle={ styles.scrollContent }
                showsVerticalScrollIndicator={ false }
            >
                <View style={ styles.content }>
                    <View style={ styles.logoContainer }>
                        {/* <Image source={ logo } style={ styles.logoIcon } resizeMode='contain' /> */}
                        <Text style={ styles.logoText }>{ AUTH_MESSAGES.LOGO_TEXT }</Text>
                        <Text style={ styles.logoSubtext }>
                            { isLogin ? AUTH_MESSAGES.LOGO_SUBTEXT_LOGIN : AUTH_MESSAGES.LOGO_SUBTEXT_REGISTER }
                        </Text>
                    </View>

                    <Animated.View style={{ transform: [{ scale: cardAnim }] }}>
                        <View style={ styles.formContainer }>
                            {
                                isLogin && (
                                    <View style={ styles.progressIndicator }>
                                        <View style={ styles.progressSteps }>
                                            <View style={[ styles.progressStep, styles.progressStepActive ]}>
                                                <View style={ styles.progressStepDot } />
                                                <Text style={ styles.progressStepLabel }>Account</Text>
                                            </View>
                                            <View style={ styles.progressLine } />
                                            <View style={[ styles.progressStep, password && isPasswordValid && styles.progressStepActive ]}>
                                                <View style={[ styles.progressStepDot, password && isPasswordValid && styles.progressStepDotActive ]} />
                                                <Text style={[ styles.progressStepLabel, password && isPasswordValid && styles.progressStepLabelActive ]}>Password</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }

                            <View style={ styles.formHeader }>
                                <Text style={ styles.formTitle }>
                                    { isLogin ? AUTH_MESSAGES.FORM_TITLE_LOGIN : AUTH_MESSAGES.FORM_TITLE_REGISTER }
                                </Text>
                            </View>

                            <EmailField
                                ref={ emailInputRef }
                                value={ email }
                                onChangeText={ (text) => {
                                    setEmail(text);
                                    debouncedEmailValidation(text);
                                } }
                                error={ errors.email }
                                isValid={ isEmailValid }
                                placeholder={ AUTH_MESSAGES.EMAIL_PLACEHOLDER }
                                editable={ !isLoading }
                                returnKeyType='next'
                                onSubmitEditing={ () => passwordInputRef.current?.focus() }
                                accessibilityLabel={ AUTH_MESSAGES.ACCESSIBILITY_EMAIL_INPUT }
                            />

                            <PasswordField
                                ref={ passwordInputRef }
                                label={ AUTH_MESSAGES.PASSWORD_LABEL }
                                value={ password }
                                onChangeText={ (text) => {
                                    setPassword(text);
                                    debouncedPasswordValidation(text);
                                    if (!isLogin && confirmPassword) {
                                        debouncedConfirmPasswordValidation(confirmPassword, text);
                                    }
                                } }
                                error={ errors.password }
                                isValid={ isPasswordValid }
                                showPassword={ showPassword }
                                onToggleVisibility={ () => setShowPassword(!showPassword) }
                                placeholder={ AUTH_MESSAGES.PASSWORD_PLACEHOLDER }
                                autoComplete='password'
                                editable={ !isLoading }
                                returnKeyType={ !isLogin ? 'next' : 'go' }
                                onSubmitEditing={ () => {
                                    if (!isLogin) {
                                        confirmPasswordInputRef.current?.focus();
                                    } else {
                                        handleSubmit();
                                    }
                                } }
                                accessibilityLabel={ AUTH_MESSAGES.ACCESSIBILITY_PASSWORD_INPUT }
                            />

                            {
                                password.length > 0 && (
                                    <PasswordRequirements password={ password } />
                                )
                            }

                            {
                                !isLogin && (
                                    <PasswordField
                                        ref={ confirmPasswordInputRef }
                                        label={ AUTH_MESSAGES.CONFIRM_PASSWORD_LABEL }
                                        value={ confirmPassword }
                                        onChangeText={ (text) => {
                                            setConfirmPassword(text);
                                            debouncedConfirmPasswordValidation(text, password);
                                        } }
                                        error={ errors.confirmPassword }
                                        isValid={ isConfirmPasswordValid }
                                        showPassword={ showConfirmPassword }
                                        onToggleVisibility={ () => setShowConfirmPassword(!showConfirmPassword) }
                                        placeholder={ AUTH_MESSAGES.CONFIRM_PASSWORD_PLACEHOLDER }
                                        autoComplete='password'
                                        editable={ !isLoading }
                                        returnKeyType='go'
                                        onSubmitEditing={ handleSubmit }
                                        accessibilityLabel={ AUTH_MESSAGES.ACCESSIBILITY_CONFIRM_PASSWORD_INPUT }
                                        confirmPassword={ password }
                                        isConfirmField={ true }
                                    />
                                )
                            }

                            <Pressable
                                onPress={ handleSubmit }
                                disabled={ isLoading }
                                style={ ({ pressed }) => [
                                    styles.submitButton,
                                    (isLoading || pressed) && styles.submitButtonPressed,
                                    isLoading && styles.submitButtonDisabled
                                ] }
                                accessibilityLabel={ AUTH_MESSAGES.ACCESSIBILITY_SUBMIT_BUTTON }
                                accessibilityRole='button'
                                accessibilityState={{ disabled: isLoading }}
                            >
                                {
                                    isLoading ? (
                                        <>
                                            <ActivityIndicator size='small' color={ COLORS.background } style={ styles.loader } />
                                            <Text style={ styles.submitButtonText }>{ AUTH_MESSAGES.LOADING }</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={ styles.submitButtonText }>
                                                { isLogin ? AUTH_MESSAGES.SUBMIT_LOGIN : AUTH_MESSAGES.SUBMIT_REGISTER }
                                            </Text>
                                            <Ionicons name='arrow-forward' size={ 18 } color={ COLORS.dark } />
                                        </>
                                    )
                                }
                            </Pressable>

                            <View style={ styles.toggleContainer }>
                                <Text style={ styles.toggleText }>
                                    { isLogin ? AUTH_MESSAGES.TOGGLE_NO_ACCOUNT : AUTH_MESSAGES.TOGGLE_HAS_ACCOUNT }
                                </Text>
                                <Pressable
                                    onPress={ toggleMode }
                                    disabled={ isLoading }
                                    accessibilityLabel={ AUTH_MESSAGES.ACCESSIBILITY_TOGGLE_MODE }
                                    accessibilityRole='button'
                                >
                                    <Text style={[ styles.toggleLink, isLoading && styles.toggleLinkDisabled ]}>
                                        { isLogin ? AUTH_MESSAGES.TOGGLE_SIGN_UP : AUTH_MESSAGES.TOGGLE_SIGN_IN }
                                    </Text>
                                </Pressable>
                            </View>

                            {
                                isLogin && (
                                    <Pressable
                                        onPress={ handleUseDemo }
                                        disabled={ isLoading }
                                        style={ ({pressed}) => [
                                            styles.demoButton,
                                            pressed && styles.demoButtonPressed,
                                            isLoading && styles.demoButtonDisabled
                                        ] }
                                        accessibilityLabel={ AUTH_MESSAGES.ACCESSIBILITY_DEMO_BUTTON }
                                        accessibilityRole='button'
                                    >
                                        <Ionicons name='sparkles-outline' size={ 18 } color={ COLORS.primary } />
                                        <Text style={ styles.demoButtonText }>{ AUTH_MESSAGES.DEMO_BUTTON }</Text>
                                    </Pressable>
                                )
                            }
                        </View>
                    </Animated.View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    backButton: {
        position: 'absolute',
        left: 24,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        minWidth: 44,
        minHeight: 44,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    backButtonPressed: {},
    backButtonText: {},
});