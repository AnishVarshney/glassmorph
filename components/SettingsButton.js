import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

const SettingsButton = ({
  title,
  onPress,
  style,
  disabled = false,
  variant = 'default', // 'default', 'outline', 'danger'
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outline;
      case 'danger':
        return styles.danger;
      default:
        return styles.default;
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[{ width: '100%' }, style]}
    >
      <BlurView
        intensity={35}
        tint="dark"
        style={[styles.blur, getButtonStyle(), disabled && styles.disabled]}
      >
        <Text
          style={[
            styles.title,
            variant === 'danger' && styles.dangerText,
            variant === 'outline' && styles.outlineText,
            disabled && styles.disabledText,
          ]}
        >
          {title}
        </Text>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blur: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.18)',
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 4,
  },
  default: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,0.28)',
  },
  danger: {
    backgroundColor: 'rgba(255,60,60,0.13)',
    borderColor: 'rgba(255,60,60,0.38)',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  outlineText: {
    color: '#fff',
  },
  dangerText: {
    color: '#FF3C3C',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#aaa',
  },
});

export default SettingsButton; 