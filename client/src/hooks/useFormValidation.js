import { useState, useCallback } from 'react';
import { isValidEmail, isValidPassword } from '../utils';

export const useFormValidation = (initialValues = {}) => {

    const [ errors, setErrors ] = useState({});
    const [ touched, setTouched ] = useState({});

    const validateEmail = useCallback((email) => {
        if (!email.trim()) {
            return 'Email is required';
        }
        if (!isValidEmail(email)) {
            return 'Please enter a valid email';
        }
        return null;
    }, []);

    const validatePassword = useCallback((password) => {
        if (!password.trim()) {
            return 'Password is required';
        }
        if (!isValidPassword(password)) {
            return 'Password must be at least 5 characters';
        }
        return null;
    }, []);

    const validateConfirmPassword = useCallback((confirmPassword, password) => {
        if (!confirmPassword.trim()) {
            return 'Please confirm your password';
        }
        if (confirmPassword !== password) {
            return 'Passwords do not match';
        }
        return null;
    }, []);

    const setFieldError = useCallback((field, error) => {
        setErrors(prev => ({ ...prev, [ field ]: error }));
    }, []);

    const setFieldTouched = useCallback((field) => {
        setTouched(prev => ({ ...prev, [ field ]: true }));
    }, []);

    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    const clearFieldError = useCallback((field) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[ field ];
            return newErrors;
        })
    }, []);

    const validateAll = useCallback((values, isLogin = true) => {
        const newErrors = {};

        const emailError = validateEmail(values.email);
        if (emailError) newErrors.email = emailError;

        const passwordError = validatePassword(values.password);
        if (passwordError) newErrors.password = passwordError;

        if (!isLogin && values.confirmPassword) {
            const confirmPasswordError = validateConfirmPassword(values.confirmPassword, values.password);
            if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [ validateEmail, validatePassword, validateConfirmPassword ]);

    return {
        errors,
        touched,
        validateEmail,
        validatePassword,
        validateConfirmPassword,
        setFieldError,
        setFieldTouched,
        clearErrors,
        clearFieldError,
        validateAll
    }
}

export default useFormValidation;