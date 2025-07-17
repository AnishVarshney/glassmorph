import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

/**
 * GlassCard is a highly flexible glassmorphic card component.
 * - Use `style` to customize the outer BlurView (borderRadius, background, etc).
 * - Use `contentStyle` to customize the inner View (layout, padding, etc).
 * - All other props are passed to BlurView.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Content inside the card
 * @param {object} [props.style] - Style for the BlurView (outer container)
 * @param {object} [props.contentStyle] - Style for the inner View (content container)
 * @param {number} [props.intensity] - Blur intensity (default: 45.4)
 * @param {object} [props.*] - Any other BlurView props
 */
const GlassCard = ({ children, style, contentStyle, intensity = 45.4, ...props }) => {
  return (
    <BlurView
      intensity={intensity}
      tint="dark" // Keeping tint="dark" as it aligns with the overall dark UI feel
      experimentalBlurMethod="dimezisBlurView" // Essential for enabling blur on Android [1]
      reducedTransparencyFallbackColor="black" // Good practice for accessibility [2, 1]
      style={[styles.blur, style]}
      {...props}
    >
      <View style={contentStyle}>{children}</View>
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
});

export default GlassCard;