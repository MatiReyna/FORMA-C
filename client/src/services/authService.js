import storageService from './storageService';
import { DEV_USER, STORAGE_KEYS } from '../constants';

export const validateCredentials = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return (
        email.trim().toLowerCase() === DEV_USER.email.toLowerCase() &&
        password === DEV_USER.password
    )
}

export const login = async (email, password) => {
    try {
        const isValid = await validateCredentials(email, password);
        if (isValid) {
            await storageService.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
            await storageService.setItem(STORAGE_KEYS.USER_EMAIL, email.trim().toLowerCase());
            return { success: true, email: email.trim().toLowerCase() };
        }
        return { success: false };
    } catch (error) {
         console.error('Error during login:', error);
         return { success: false };
    }
}

export const register = async (email, password) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        await storageService.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
        await storageService.setItem(STORAGE_KEYS.USER_EMAIL, email.trim().toLowerCase());
        return { success: true, email: email.trim().toLowerCase() };
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false };
    }
}

export const isAuthenticated = async () => {
    try {
        const authStatus = await storageService.getItem(STORAGE_KEYS.IS_AUTHENTICATED, false);
        return authStatus === 'true';
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
}

export const getCurrentUser = async () => {
    try {
        return await storageService.getItem(STORAGE_KEYS.USER_EMAIL, false);
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

export const logout = async () => {
    try {
        await storageService.multiRemove([
            STORAGE_KEYS.IS_AUTHENTICATED,
            STORAGE_KEYS.USER_EMAIL,
            STORAGE_KEYS.HAS_SEEN_ONBOARDING
        ]);
        await storageService.setItem(STORAGE_KEYS.SHOULD_LOGOUT, 'true');
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
}

export {
    validateCredentials,
    login,
    register,
    isAuthenticated,
    getCurrentUser,
    logout
}