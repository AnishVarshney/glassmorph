import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import TestScreen1 from '../screens/TestScreen1';
import AuthScreen from '../screens/AuthScreen';
import PlayerScreen from '../screens/PlayerScreen';
import RecentsScreen from '../screens/RecentsScreen';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={TabNavigator} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    <Stack.Screen name="Testing" component={TestScreen1} />
    <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Player" component={PlayerScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Recents" component={RecentsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default RootStackNavigator; 