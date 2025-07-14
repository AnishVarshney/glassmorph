import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { BlurView } from 'expo-blur'; // Uncomment if you want real blur

const { width } = Dimensions.get('window');

// Responsive sizing based on screen width
const PILL_WIDTH = Math.max(220, Math.min(width * 0.74, 360)); // 74% of screen, min 220, max 360
const PILL_HEIGHT = Math.max(56, Math.min(width * 0.17, 70)); // 17% of screen, min 56, max 70
const PILL_RADIUS = PILL_HEIGHT / 2; // Fully rounded
const SEARCH_SIZE = PILL_HEIGHT; // Search button matches pill height

export const TAB_BAR_HEIGHT = PILL_HEIGHT;

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
        <LinearGradient
          colors={["rgba(255,255,255,0.20)", "rgba(255,255,255,0.07)"]}
          style={[styles.pill, {
            width: PILL_WIDTH,
            height: PILL_HEIGHT,
            borderRadius: PILL_RADIUS,
            shadowRadius: 20,
            shadowOpacity: 0.15,
          }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
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
                style={[styles.pillTab, { height: PILL_HEIGHT }]}
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
        </LinearGradient>
        {/* </BlurView> */}
        {/* Search Button */}
        <View style={[styles.searchButtonWrapper, { height: PILL_HEIGHT }]}> 
          <TouchableOpacity
            style={[styles.searchButton, {
              width: SEARCH_SIZE,
              height: SEARCH_SIZE,
              borderRadius: SEARCH_SIZE / 2,
              shadowRadius: 20,
              shadowOpacity: 0.15,
            }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(state.routes[3].name)}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.20)", "rgba(255,255,255,0.07)"]}
              style={[styles.searchButtonInner, {
                width: SEARCH_SIZE,
                height: SEARCH_SIZE,
                borderRadius: SEARCH_SIZE / 2,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.16)',
              }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons
                name={state.index === 3 ? 'search' : 'search-outline'}
                size={28}
                color={state.index === 3 ? activeColor : inactiveColor}
                style={{ opacity: state.index === 3 ? 1 : 0.7 }}
              />
            </LinearGradient>
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