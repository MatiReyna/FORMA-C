import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from './src/constants/colors';

export default function App() {
  return (
    <View style={ styles.loadingContainer }>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background
  }
});