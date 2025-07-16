import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

const GlassCard = ({ children, style, intensity = 45.4 }) => { // Updated default intensity to 45.4 from Figma
  return (
    <BlurView
      intensity={intensity}
      tint="dark" // Keeping tint="dark" as it aligns with the overall dark UI feel
      experimentalBlurMethod="dimezisBlurView" // Essential for enabling blur on Android [1]
      reducedTransparencyFallbackColor="black" // Good practice for accessibility [2, 1]
      style={[styles.blur, style]}
    >
      <View style={styles.inner}>{children}</View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blur: {
    borderRadius: 18,
    overflow: 'hidden', // Ensures the blur and content are clipped by the border radius [3]
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Card background color: White at 20% opacity from Figma
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)', // Border color: White at 16% opacity from Figma
   ...Platform.select({ // Applying platform-specific shadow properties [4, 5]
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.15)', // Shadow color: Black at 15% opacity from Figma
        shadowOffset: { width: 3, height: 4 }, // Shadow offset: X=3, Y=4 from Figma
        shadowOpacity: 0.15, // Shadow opacity: 15% from Figma
        shadowRadius: 20, // Shadow blur: 20 from Figma
      },
      android: {
        elevation: 20, // Android's elevation property for shadows and Z-order. Setting it to match the blur radius for visual depth.[4, 6]
        // For more precise Android shadow control, especially for older APIs,
        // a library like 'react-native-shadow-2' could be considered.[6]
      },
    }),
  },
  inner: {
    padding: 20,
    // Add any specific styling for the content inside the card here if needed.
  },
});

export default GlassCard;