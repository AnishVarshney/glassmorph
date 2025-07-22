import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import AuthScreen from '../screens/AuthScreen';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={TabNavigator} />
    <Stack.Screen name="Auth" component={AuthScreen} />
    {/* Player screen at root level for global access */}
    <Stack.Screen 
      name="Player" 
      component={PlayerScreen}
      options={{
        presentation: 'fullScreenModal', // iOS modal presentation
        animation: 'slide_from_bottom', // Smooth slide up animation
        gestureEnabled: true, // Allow swipe to dismiss
      }}
    />
  </Stack.Navigator>
);

export default RootStackNavigator;