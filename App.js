import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStackNavigator from './navigation/RootStackNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
    </View>
    </SafeAreaProvider>
  );
}
