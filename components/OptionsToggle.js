import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions, Text, Easing, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const DEFAULT_OPTIONS = [
  { icon: { type: 'Ionicons', name: 'heart-outline', size: 24, color: '#fff' }, label: 'Add to Favourites' },
  { icon: { type: 'Ionicons', name: 'share-social-outline', size: 22, color: '#fff' }, label: 'Share' },
  { icon: { type: 'MaterialCommunityIcons', name: 'cast', size: 22, color: '#fff' }, label: 'Mirror Cast' },
  { icon: { type: 'Ionicons', name: 'timer-outline', size: 22, color: '#fff' }, label: 'Sleep Timer' },
];

const OptionsToggle = ({
  options = DEFAULT_OPTIONS,
  style,
  menuWidth = 220,
  menuTop = 16,
  menuRight = 16,
  buttonSize = 44,
}) => {
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const toggleMenu = () => {
    Animated.timing(anim, {
      toValue: open ? 0 : 1,
      duration: 260,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start(() => setOpen(!open));
  };

  // Animate menu opacity and scale
  const menuScale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] });
  const menuOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const menuTranslateY = anim.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] });

  return (
    <View style={[styles.container, style, { top: menuTop + insets.top, right: menuRight }]} pointerEvents="box-none">
      {/* Menu */}
      <Animated.View
        pointerEvents={open ? 'auto' : 'none'}
        style={[
          styles.menu,
          {
            width: menuWidth,
            opacity: menuOpacity,
            transform: [
              { scale: menuScale },
              { translateY: menuTranslateY },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={["rgba(40,40,40,0.22)", "rgba(40,40,40,0.13)"]}
          style={styles.menuGlass}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {options.map((opt, idx) => (
            <TouchableOpacity
              key={opt.label}
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {/* handle option */}}
            >
              <View style={styles.menuIcon}>
                {opt.icon.type === 'Ionicons' ? (
                  <Ionicons name={opt.icon.name} size={opt.icon.size} color={opt.icon.color} />
                ) : (
                  <MaterialCommunityIcons name={opt.icon.name} size={opt.icon.size} color={opt.icon.color} />
                )}
              </View>
              <Text style={styles.menuLabel}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.menuDotsRow}>
            <Ionicons name="ellipsis-horizontal" size={22} color="#fff" style={{ opacity: 0.7 }} />
          </View>
        </LinearGradient>
      </Animated.View>
      {/* Toggle Button */}
      <TouchableOpacity
        style={[styles.toggleBtn, { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 }]}
        activeOpacity={0.8}
        onPress={toggleMenu}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.13)", "rgba(255,255,255,0.07)"]}
          style={[styles.toggleBtnInner, { borderRadius: buttonSize / 2 }]}
        >
          <Ionicons name="ellipsis-horizontal" size={26} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    alignItems: 'flex-end',
    pointerEvents: 'box-none',
  },
  toggleBtn: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor: 'transparent',
  },
  toggleBtnInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 12,
    marginTop: Platform.OS === 'android' ? 2 : 0,
    marginRight: 0,
  },
  menuGlass: {
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 0,
    minWidth: 180,
    backgroundColor: 'rgba(40,40,40,0.13)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  menuIcon: {
    width: 28,
    alignItems: 'center',
    marginRight: 14,
  },
  menuLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  menuDotsRow: {
    alignItems: 'flex-end',
    paddingRight: 18,
    paddingTop: 6,
  },
});

export default OptionsToggle; 