import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BAR_WIDTH, BAR_HEIGHT, BAR_RADIUS } from '../constants/ui';
import GlassCard from './GlassCard';
// import { BlurView } from 'expo-blur'; // Uncomment if you want real blur

const { width } = Dimensions.get('window');

// Responsive sizing based on screen width
// Remove PILL_WIDTH, PILL_HEIGHT, PILL_RADIUS, SEARCH_SIZE, TAB_BAR_HEIGHT

export const TAB_BAR_HEIGHT = BAR_HEIGHT;

const TAB_ICONS = [
  { name: 'home-outline', focused: 'home' },
  { name: 'radio-outline', focused: 'radio' },
  { name: 'heart-outline', focused: 'heart' },
];

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const activeColor = '#fff';
  const inactiveColor = 'rgba(255,255,255,0.45)';

  return (
    <View style={[styles.outerContainer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 16 }]}
      pointerEvents="box-none"
    >
      <View style={styles.innerRow}>
        {/* Optionally wrap in BlurView for real blur effect */}
        {/* <BlurView intensity={45} tint="dark" style={[styles.pill, pillDynamicStyle]}> */}
        <GlassCard
          style={[
            styles.pill,
            {
              width: BAR_WIDTH,
              height: BAR_HEIGHT,
              borderRadius: BAR_RADIUS,
              shadowRadius: 20,
              shadowOpacity: 0.15,
            },
          ]}
          contentStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between', // or 'center' if you prefer
            flex: 1,
            height: '100%',
            paddingHorizontal: 0, // or adjust as needed
          }}
        >
          {state.routes.slice(0, 3).map((route, idx) => {
            const isFocused = state.index === idx;
            const { options } = descriptors[route.key];
            const iconName = isFocused ? TAB_ICONS[idx].focused : TAB_ICONS[idx].name;
            const onPress = () => {
              if (!isFocused) {
                navigation.navigate(route.name);
              }
            };
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                style={[styles.pillTab, { height: BAR_HEIGHT }]}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={iconName}
                  size={28}
                  color={isFocused ? activeColor : inactiveColor}
                  style={{ opacity: isFocused ? 1 : 0.7 }}
                />
              </TouchableOpacity>
            );
          })}
        </GlassCard>
        {/* </BlurView> */}
        {/* Search Button */}
        <View style={[styles.searchButtonWrapper, { height: BAR_HEIGHT }]}> 
          <TouchableOpacity
            style={[styles.searchButton, {
              width: BAR_HEIGHT,
              height: BAR_HEIGHT,
              borderRadius: BAR_RADIUS,
              shadowRadius: 20,
              shadowOpacity: 0.15,
            }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(state.routes[3].name)}
          >
            <GlassCard style={[styles.searchButtonInner, {
                width: BAR_HEIGHT,
                height: BAR_HEIGHT,
                borderRadius: BAR_RADIUS,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.16)',
              }]}
            >
              <Ionicons
                name={state.index === 3 ? 'search' : 'search-outline'}
                size={28}
                color={state.index === 3 ? activeColor : inactiveColor}
                style={{ opacity: state.index === 3 ? 1 : 0.7 }}
              />
            </GlassCard>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 100,
    pointerEvents: 'box-none',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.16)',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 4 },
    elevation: 6,
    marginRight: 18,
    paddingHorizontal: 18,
  },
  pillTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  searchButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 4 },
    elevation: 8,
  },
  searchButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.20)',
  },
});

export default CustomTabBar; 