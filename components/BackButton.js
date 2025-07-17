import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({
  containerStyle,
  buttonStyle,
  size = 40,
  ...props
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  //   if (!navigation.canGoBack()) return null;
  return (
    <View style={[{ paddingTop: insets.top + 8 }, containerStyle]} pointerEvents="box-none">
      <TouchableOpacity
        style={[{ width: size, height: size, borderRadius: size / 2 }, styles.btn, buttonStyle]}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        {...props}
      >
        <BlurView
          intensity={45.4} // From Figma: "Background blur: Blur 45.4" [Image 2, Image 3]
          tint="dark" // Keeping tint="dark" as it aligns with the overall dark UI feel
          experimentalBlurMethod="dimezisBlurView" // Essential for enabling blur on Android [2]
          reducedTransparencyFallbackColor="black" // Good practice for accessibility [3]
          style={styles.blurViewStyle}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </View>
        </BlurView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor: 'transparent',
  },
  blurViewStyle: {
    flex: 1, // Make BlurView fill the TouchableOpacity's dimensions
    borderRadius: 20, // Half of the 40px size for a perfect circle (Figma "Radius 100px" implies circular shape) [Image 2]
    overflow: 'hidden', // Crucial for borderRadius to clip the blur and content correctly [5]
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // From Figma: "Colors: #FFFFFF 20%" [Image 2]
    borderWidth: 1, // From Figma: "Borders: 1px" [Image 2]
    borderColor: 'rgba(255, 255, 255, 0.16)', // From Figma: "Borders: #FFFFFF 16%" [Image 2]
    ...Platform.select({ // Applying platform-specific shadow properties [6, 7]
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.15)', // From Figma: "#000000 15%" [Image 2]
        shadowOffset: { width: 3, height: 4 }, // From Figma: "X 3 Y 4" [Image 2]
        shadowOpacity: 0.15, // From Figma: "15%" [Image 2]
        shadowRadius: 20, // From Figma: "Blur 20" [Image 2]
      },
      android: {
        elevation: 20, // Android's elevation property for shadows and Z-order. Setting it to match the blur radius for visual depth. [8, 5]
        // For more precise Android shadow control, especially for older APIs,
        // a library like 'react-native-shadow-2' could be considered. [7]
      },
    }),
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BackButton; 