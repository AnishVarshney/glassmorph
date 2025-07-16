import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Video } from 'expo-av';
import { BlurView } from 'expo-blur';

export default function ScreenWrapper({ children }) {
  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/bg.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isLooping
        shouldPlay
        isMuted
        ignoreSilentSwitch="obey"
      />
      <BlurView
        intensity={40}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
      {/* <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: 'rgba(255,255,255,0.22)', // milky overlay
            borderColor: 'rgba(255,255,255,0.18)',     // optional border
            borderWidth: 1,
          },
        ]}
        pointerEvents="none"
      /> */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    // backgroundColor: 'rgba(10,10,20,0.7)',

  },
  content: {
    flex: 1,
    zIndex: 2,
  },
}); 