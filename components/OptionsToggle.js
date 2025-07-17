import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions, Text, Easing, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlassCard from './GlassCard';

const { width, height } = Dimensions.get('window');

const DEFAULT_OPTIONS = [
  { icon: { type: 'Ionicons', name: 'heart-outline', size: 24, color: '#fff' }, label: 'Add to Favourites' },
  { icon: { type: 'Ionicons', name: 'share-social-outline', size: 22, color: '#fff' }, label: 'Share' },
  { icon: { type: 'MaterialCommunityIcons', name: 'cast', size: 22, color: '#fff' }, label: 'Mirror Cast' },
  { icon: { type: 'Ionicons', name: 'timer-outline', size: 22, color: '#fff' }, label: 'Sleep Timer' },
];

const OptionsToggle = ({
  options = DEFAULT_OPTIONS,
  containerStyle,
  buttonStyle,
  menuWidth = 220,
  buttonSize = 44,
  top = 16,
  right = 16,
  // New props for flexible positioning
  isAbsolute = true,
  renderCustomButton,
  onOptionSelect,
  // Props for relative positioning
  isOpen,
  onToggle,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  // Use external state if provided, otherwise use internal state
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onToggle || setInternalOpen;

  const toggleMenu = () => {
    Animated.timing(anim, {
      toValue: open ? 0 : 1,
      duration: 260,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();
    setOpen(!open);
  };

  // Animate menu opacity and scale
  const menuScale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] });
  const menuOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const menuTranslateY = anim.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] });

  // Calculate menu position to ensure it stays within screen bounds
  const menuHeight = (options.length * 48) + 60;
  const buttonTop = isAbsolute ? top + insets.top : 0;
  const availableSpaceBelow = height - (buttonTop + buttonSize + 10);
  const shouldShowAbove = availableSpaceBelow < menuHeight;
  
  // Calculate horizontal position
  const availableSpaceRight = width - (isAbsolute ? right + buttonSize : buttonSize);
  const shouldAlignLeft = availableSpaceRight < menuWidth;

  const handleOptionPress = (option) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    }
    toggleMenu(); // Close menu after selection
  };

  const containerProps = isAbsolute ? {
    position: 'absolute',
    top: buttonTop,
    right: right,
    zIndex: 1000,
  } : {
    position: 'relative',
    zIndex: 1000,
  };

  return (
    <View 
      style={[
        styles.container, 
        containerStyle,
        containerProps
      ]} 
      pointerEvents="box-none"
    >
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
            // Position menu relative to button
            top: shouldShowAbove ? -(menuHeight + 10) : buttonSize + 10,
            right: shouldAlignLeft ? -(menuWidth - buttonSize) : 0,
          },
        ]}
      >
        <GlassCard style={styles.menuGlassCard} intensity={45.4}>
          <View style={styles.menuContent}>
            {options.map((opt, idx) => (
              <TouchableOpacity
                key={opt.label}
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={() => handleOptionPress(opt)}
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
          </View>
        </GlassCard>
      </Animated.View>

      {/* Toggle Button - Render custom button if provided */}
      {renderCustomButton ? (
        renderCustomButton(toggleMenu, open)
      ) : (
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            { 
              width: buttonSize, 
              height: buttonSize, 
              borderRadius: buttonSize / 2,
            },
            buttonStyle,
          ]}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 12,
    zIndex: 1001,
  },
  menuGlassCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: 'rgba(40,40,40,0.2)',
  },
  menuContent: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    minWidth: 180,
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
    paddingBottom: 4,
  },
});

export default OptionsToggle;