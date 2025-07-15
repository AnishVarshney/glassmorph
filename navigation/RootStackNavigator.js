import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import TestScreen1 from '../screens/TestScreen1';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={TabNavigator} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    <Stack.Screen name="Testing" component={TestScreen1} />
  </Stack.Navigator>
);

export default RootStackNavigator; 