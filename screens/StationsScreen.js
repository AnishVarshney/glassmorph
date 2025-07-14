import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import GlassmorphicView from '../components/GlassmorphicView';

export default function StationsScreen() {
  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="light-content" />
      {/* Gradient background */}
      <LinearGradient
        colors={['#8A2BE2', '#4169E1', '#00BFFF']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {/* Full-screen blur */}
      <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />
      {/* Your content */}
      <GlassmorphicView style={styles.glass}>
        <Text style={{ color: 'white' }}>Hello Glass!</Text>
      </GlassmorphicView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  glass: {
    width: 200,
    height: 100,
    borderRadius: 15,
  },
});