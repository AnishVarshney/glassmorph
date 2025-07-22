import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, useNavigationState } from '@react-navigation/native';
import HomeStack from './HomeStack';
import StationsScreen from '../screens/StationsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import CustomTabBar from '../components/CustomTabBar';
import PlayerBar from '../components/PlayerBar';

const Tab = createBottomTabNavigator();

const MAIN_TAB_ROOTS = ['HomeMain', 'Stations', 'Favorites', 'Search'];
const HIDDEN_ROUTES = ['Settings', 'Account', 'ChangePassword', ];

function getDeepestRouteName(route) {
  if (!route) return null;
  if (route.state && route.state.index != null) {
    return getDeepestRouteName(route.state.routes[route.state.index]);
  }
  return route.name;
}

const TabNavigator = () => {
  // Always get the latest navigation state
  const navState = useNavigationState(state => state);

  // Compute the current focused route name
  let currentRouteName = 'HomeMain';
  if (navState) {
    const currentRoute = navState.routes[navState.index];
    currentRouteName = getDeepestRouteName(currentRoute) ?? 'HomeMain';
  }
  // console.log('[TabNavigator] Render: currentRouteName =', currentRouteName);

  return (
    <>
    <Tab.Navigator
        tabBar={props => {
          const currentRoute = props.state.routes[props.state.index];
          const focusedRouteName = getDeepestRouteName(currentRoute) ?? 'HomeMain';
          console.log('[TabNavigator] tabBar: focusedRouteName =', focusedRouteName);
          if (HIDDEN_ROUTES.includes(focusedRouteName)) {
            return null;
          }
          return <CustomTabBar {...props} />;
        }}
      screenOptions={{
        headerShown: false,
      }}
    >
        <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Stations" component={StationsScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
      {/* Render PlayerBar ONLY on the 4 main tab roots */}
      {/* {MAIN_TAB_ROOTS.includes(currentRouteName) && <PlayerBar />} */}
    </>
  );
};

export default TabNavigator; 