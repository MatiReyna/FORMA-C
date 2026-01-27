import { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '../constants/colors';

export default function NameScreen({ onSubmit }) {

    const [ name, setName ] = useState('');

    const handleContinue = async () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        try {
            await AsyncStorage.setItem('userName', trimmed);
            onSubmit(trimmed);
        } catch (error) {
            console.error('Error saving user name:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
            style={{ flex: 1 }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingHorizontal: 32,
                }}
            >
                <Text
                    style={{
                        color: COLORS.textPrimary,
                        fontSize: 26,
                        textAlign: 'center',
                        marginBottom: 32,
                    }}
                >
                    How should we call you?
                </Text>
                <TextInput
                    value={ name }
                    onChangeText={ setName }
                    placeholder='Your name'
                    placeholderTextColor={ COLORS.textSecondary }
                    autoFocus
                    returnKeyType='done'
                    onSubmitEditing={ handleContinue }
                    style={{
                        color: COLORS.textPrimary,
                        fontSize: 18,
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.border,
                        paddingVertical: 12,
                        marginBottom: 40
                    }}
                />

                <Pressable
                    onPress={ handleContinue }
                    disabled={ !name.trim() }
                >
                    <Text
                        style={{
                            color: name.trim() ? COLORS.primary : COLORS.textTertiary,
                            fontSize: 18,
                            textAlign: 'center'
                        }}
                    >
                        Enter FORMA
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
};