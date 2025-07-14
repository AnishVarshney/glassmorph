// components/GlassmorphicView.js
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

const GlassmorphicView = ({
  children,
  style, // Allows overriding default styles or adding positioning/sizing
  blurIntensity = 20, // Controls blur strength (0-100)
  blurTint = 'light', // 'light', 'dark', or 'default'
  backgroundColor = 'rgba(255, 255, 255, 0.2)', // Translucent white by default
  borderRadius = 15, // Rounded corners
  borderColor = 'rgba(255, 255, 255, 0.4)', // Slightly more opaque border
  borderWidth = 1,
  // Shadow properties for both platforms
  shadowColor = '#000',
  shadowOffset = { width: 0, height: 4 },
  shadowOpacity = Platform.OS === 'ios' ? 0.1 : 0.2, // Adjust opacity for platform
  shadowRadius = 6,
  elevation = 8, // Android shadow
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderRadius,
          // Apply shadows to the outer container. BlurView itself doesn't cast shadows well.
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation,
        },
        style, // Apply external styles last to allow overriding
      ]}
    >
      <BlurView
        intensity={blurIntensity}
        tint={blurTint}
        style={[
          StyleSheet.absoluteFill, // Make BlurView fill its parent (the container)
          { borderRadius, overflow: 'hidden' }, // Clip blur to the container's borderRadius
        ]}
      >
        {/* This inner View holds the translucent background and the actual content */}
        <View
          style={[
            styles.contentWrapper,
            {
              backgroundColor,
              borderRadius, // Apply border radius here as well
              borderColor,
              borderWidth,
            },
          ]}
        >
          {children}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // No fixed dimensions here. The size will be determined by its parent or the 'style' prop.
    // This makes it flexible.
  },
  contentWrapper: {
    flex: 1, // Ensure content wrapper fills the BlurView
    // Default padding or content alignment can be added here if common,
    // otherwise, let the 'children' handle their own spacing.
    justifyContent: 'center', // Example: Vertically center content by default
    alignItems: 'center', // Example: Horizontally center content by default
  },
});

export default GlassmorphicView;