import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import RecentsScreen from '../screens/RecentsScreen';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ presentation: 'card' }}
    />
    <Stack.Screen
      name="Account"
      component={AccountScreen}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
    />
    <Stack.Screen
      name="Recents"
      component={RecentsScreen}
    />
    <Stack.Screen
      name="Player"
      component={PlayerScreen}
    />
  </Stack.Navigator>
);

export default HomeStack; 