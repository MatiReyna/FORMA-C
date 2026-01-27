import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

import OnboardingScreen from './src/screens/OnboardingScreen';
import AuthScreen from './src/screens/AuthScreen';

import { COLORS } from './src/constants/colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style='light' backgroundColor={ COLORS.background } />
      <OnboardingScreen />
      {/* <AuthScreen /> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});