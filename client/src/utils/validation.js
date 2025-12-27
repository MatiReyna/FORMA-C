export const isValidEmail = (email) => {
    if (!email || !email.trim()) return false;
    return email.includes('@') && email.includes('.');
}

export const isValidPassword = (password, minLength = 5) => {
    if (!password || !password.trim()) return false;
    return password.length >= minLength;
}

export const isValidHabitName = (name, minLength = 2) => {
    if (!name || !name.trim()) return false;
    return name.trim().length >= minLength;
}

export const getPasswordStrength = (password) => {
    if (!password || password.length === 0) {
        return { level: 'weak', percentage: 0 };
    }

    let strength = 0;
    const checks = {
        length: password.length >= 5,
        mediumLength: password.length >= 8,
        longLength: password.length >= 12,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumbers: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }

    if (checks.length) strength += 20;
    if (checks.mediumLength) strength += 20;
    if (checks.longLength) strength += 20;
    if (checks.hasUpperCase) strength += 10;
    if (checks.hasLowerCase) strength += 10;
    if (checks.hasNumbers) strength += 10;
    if (checks.hasSpecialChar) strength += 10;

    let level = 'Can be stronger';
    if (strength >= 70) level = 'Excellent';
    else if (strength >= 40) level = 'Good';

    return { level, percentage: Math.min(strength, 100) };
}

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        }
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }
}

export {
    isValidEmail,
    isValidPassword,
    isValidHabitName,
    getPasswordStrength,
    debounce
}