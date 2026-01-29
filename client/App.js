import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import OnboardingScreen from './src/screens/OnboardingScreen';
import NameScreen from './src/screens/NameScreen';

import { COLORS } from './src/constants/colors';
import { STORAGE_KEYS } from './src/constants';
import { getItem } from './src/services/storageService';

export default function App() {

  const [ isLoading, setIsLoading ] = useState(true);
  const [ hasCompletedOnboarding, setHasCompletedOnboarding ] = useState(false);
  const [ userName, setUserName ] = useState(null);

  useEffect(() => {
    const loadAppState = async () => {
      try {
        const storedOnboarding = await getItem(STORAGE_KEYS.HAS_SEEN_ONBOARDING);
        const storedName = await getItem(STORAGE_KEYS.USER_NAME);

        setHasCompletedOnboarding(Boolean(storedOnboarding));
        setUserName(storedName);
      } catch (error) {
        console.error('Error loading app state:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAppState();
  }, []);

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
  };

  const handleNameSubmit = (name) => {
    setUserName(name);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style='light' backgroundColor={ COLORS.background } />
      {
        isLoading ? (
          <View style={ styles.container }>
            <ActivityIndicator size='large' color={ COLORS.primary } />
          </View>
        ) : !hasCompletedOnboarding ? (
          <OnboardingScreen onComplete={ handleOnboardingComplete } />
        ) : !userName ? (
          <NameScreen onSubmit={ handleNameSubmit } />
        ) : (
          <View style={ styles.container }>
            <Text style={{ color: COLORS.textPrimary }}>
              FORMA - main app coming next
            </Text>
          </View>
        )
      }
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  }
});