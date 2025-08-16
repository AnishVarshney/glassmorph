import React from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import { Video } from 'expo-av';
import { BlurView } from 'expo-blur';

import Grains from '../assets/Grains.svg'; // If using react-native-svg
import Grain from '../assets/Grain.png'; // If using react-native-svg


export default function ScreenWrapper({ children }) {
  return (
    <View style={styles.container}>
      {/* 1. Video Layer */}
      <Video
        source={require('../assets/bg.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isLooping
        shouldPlay
        isMuted
        ignoreSilentSwitch="obey"
      />
      {/* 2. Black Overlay */}
      <View style={styles.blackOverlay} pointerEvents="none" />
      {/* 3. Grain Overlay (SVG)
      <View style={styles.grainOverlay} pointerEvents="none">
        <Grain width="100%" height="100%" preserveAspectRatio="none" style={{ opacity: 0.08 }} />
      </View> */}
      {/* 3. Grain Overlay (PNG) */}
      <Image
        source={Grain}
        style={[StyleSheet.absoluteFill, { opacity: 0.008, zIndex: 2 }]}
        resizeMode="cover"
        pointerEvents="none"
      />
      {/* 4. White Overlay */}
      <View style={styles.whiteOverlay} pointerEvents="none" />
      {/* 5. Blur */}
      <BlurView
        intensity={100}
        tint="dark"
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
        experimentalBlurMethod="dimezisBlurView" // Add this line
        blurReductionFactor={80}
        
      />
      {/* 6. Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  blackOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.25,
    zIndex: 1,
  },
  grainOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
    // opacity is set on the SVG/Image itself
  },
  whiteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    opacity: 0.03,
    zIndex: 3,
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
}); 