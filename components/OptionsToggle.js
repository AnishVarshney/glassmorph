import React, { useRef, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  Text, 
  Easing, 
  Platform,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import GlassCard from './GlassCard';

const { width, height } = Dimensions.get('window');

const OptionsToggle = ({
  visible = false,
  options = [],
  position = { x: 0, y: 0, width: 0, height: 0 },
  onClose,
  onOptionSelect,
  menuWidth = 200,
}) => {
  const anim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(anim, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(anim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.in(Easing.quad),
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.85,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.in(Easing.quad),
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.in(Easing.quad),
        }),
      ]).start();
    }
  }, [visible]);

  const handleOptionPress = (option) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    }
    onClose();
  };

  const handleOutsidePress = () => {
    onClose();
  };

  // Calculate menu position to ensure it stays within screen bounds
  const menuHeight = (options.length * 48) + 20; // 48px per item + padding
  const buttonCenterX = position.x + (position.width / 2);
  const buttonCenterY = position.y + (position.height / 2);
  
  // Determine if menu should appear above or below the button
  const availableSpaceBelow = height - (position.y + position.height + 10);
  const shouldShowAbove = availableSpaceBelow < menuHeight;
  
  // Calculate horizontal position (center the menu on the button)
  let menuLeft = buttonCenterX - (menuWidth / 2);
  
  // Ensure menu doesn't go off screen horizontally
  const padding = 20;
  if (menuLeft < padding) {
    menuLeft = padding;
  } else if (menuLeft + menuWidth > width - padding) {
    menuLeft = width - menuWidth - padding;
  }
  
  // Calculate vertical position
  const menuTop = shouldShowAbove 
    ? position.y - menuHeight - 10 
    : position.y + position.height + 10;

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.menuContainer,
              {
                left: menuLeft,
                top: menuTop,
                width: menuWidth,
                opacity: opacityAnim,
                transform: [
                  { scale: scaleAnim },
                  { 
                    translateY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [shouldShowAbove ? 10 : -10, 0],
                    })
                  }
                ],
              },
            ]}
          >
            <GlassCard style={styles.menuGlassCard} intensity={45.4}>
              <View style={styles.menuContent}>
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={`${option.label}-${index}`}
                    style={[
                      styles.menuItem,
                      index === options.length - 1 && styles.lastMenuItem
                    ]}
                    activeOpacity={0.7}
                    onPress={() => handleOptionPress(option)}
                  >
                    <View style={styles.menuIcon}>
                      {option.icon.type === 'Ionicons' ? (
                        <Ionicons 
                          name={option.icon.name} 
                          size={option.icon.size} 
                          color={option.icon.color} 
                        />
                      ) : (
                        <MaterialCommunityIcons 
                          name={option.icon.name} 
                          size={option.icon.size} 
                          color={option.icon.color} 
                        />
                      )}
                    </View>
                    <Text style={styles.menuLabel}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </GlassCard>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Subtle overlay
  },
  menuContainer: {
    position: 'absolute',
    zIndex: 1000,
  },
  menuGlassCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: 'rgba(40, 40, 40, 0.2)',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  menuContent: {
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    minHeight: 48,
  },
  lastMenuItem: {
    // No additional styling needed, but can be used for customization
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
    flex: 1,
  },
});

export default OptionsToggle;