import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
    try {
        const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error(`Error saving ${ key }:`, error);
        throw error;
    }
};

export const getItem = async (key, parseJson = true) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value === null) return null;
        return parseJson ? JSON.parse(value) : value;
    } catch (error) {
        console.error(`Error loading ${ key }:`, error);
        return null;
    }
};

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing ${ key }:`, error);
        throw error;
    }
};

export const multiRemove = async (keys) => {
    try {
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error removing multiple items:', error);
        throw error;
    }
};

export default {
    setItem,
    getItem,
    removeItem,
    multiRemove
}