import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './src/screens/OnboardingScreen';
import AuthScreen from './src/screens/AuthScreen';

import { COLORS } from './src/constants/colors';

export default function App() {

  const [ isLoading, setIsLoading ] = useState(true);
  const [ hasCompletedOnboarding, setHasCompletedOnboarding ] = useState(false);
  const [ userName, setUserName ] = useState(null);

  useEffect(() => {
    const loadAppState = async () => {
      try {
        const storedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
        const storedName = await AsyncStorage.getItem('userName');

        setHasCompletedOnboarding(storedOnboarding === 'true');
        setUserName(storedName);
      } catch (error) {
        console.error('Error loading app state:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAppState();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style='light' backgroundColor={ COLORS.background } />
      {
        isLoading ? (
          <View />
        ) : !hasCompletedOnboarding ? (
          <OnboardingScreen />
        ) : !userName ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: COLORS.textPrimary }}>
              Name screen placeholder
            </Text>
          </View>
        ) : (
          <AuthScreen />
        )
      }
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});