import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStackNavigator from './navigation/RootStackNavigator';
import PlayerBar from './components/PlayerBar';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
        {/* <PlayerBar
          image="https://i.scdn.co/image/ab67616d0000b273e0e1e1e1e1e1e1e1e1e1e1e1"
          title="Timeless"
          subtitle="The Weeknd"
        /> */}
    </View>
    </SafeAreaProvider>
  );
}
