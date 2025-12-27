import { memo } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { getPasswordStrength } from '../utils/validation';

const PasswordRequirements = memo(({ password }) => {

    if (!password || password.length === 0) return null;

    const minLengthMet = password.length >= 5;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strength = getPasswordStrength(password);

    const getStrengthColor = () => {
        if (strength.level === 'strong') return COLORS.success;
        if (strength.level === 'medium') return '#FFA500';
        return COLORS.error;
    }

    const requirements = [
        { met: minLengthMet, text: 'Minimum 5 characters' },
        { met: hasUpperCase, text: 'Add a capital letter' },
        { met: hasLowerCase, text: 'One lowercase letter' },
        { met: hasNumbers, text: 'Add a number' },
        { met: hasSpecialChar, text: 'Try with aspecial character' }
    ]

    return (
        <View style={ styles.container }>
            <View style={ styles.strengthContainer }>
                <View style={ styles.strengthBarBackground }>
                    <Animated.View
                        style={[
                            styles.strengthBar,
                            {
                                width: `${ strength.percentage }%`,
                                backgroundColor: getStrengthColor()
                            }
                        ]}
                    />
                </View>
                <Text style={[ styles.strengthText, { color: getStrengthColor() } ]}>
                    { strength.level.charAt(0).toUpperCase() + strength.level.slice(1) }
                </Text>
            </View>

            <View style={ styles.requirementsList }>
                {
                    requirements.map((req, index) => (
                        <View key={ index } style={ styles.requirementItem }>
                            <Ionicons
                                name={ req.met ? 'checkmark-circle' : 'ellipse-outline' }
                                size={ 14 }
                                color={ req.met ? COLORS.success : COLORS.textTertiary }
                            />
                            <Text
                                style={[
                                    styles.requirementText,
                                    req.met && styles.requirementTextMet
                                ]}
                            >
                                { req.text }
                            </Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {},
    strengthContainer: {},
    strengthBarBackground: {},
    strengthBar: {},
    strengthText: {},
    requirementsList: {},
    requirementItem: {},
    requirementText: {},
    requirementTextMet: {}
});

export default PasswordRequirements;