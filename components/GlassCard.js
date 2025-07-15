import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

const GlassCard = ({ children, style, intensity = 40 }) => {
  return (
    <BlurView intensity={intensity} tint="dark" style={[styles.blur, style]}>
      <View style={styles.inner}>{children}</View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blur: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.13)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  inner: {
    padding: 20,
  },
});

export default GlassCard; 