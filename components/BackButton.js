import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BackButton = ({
  onPress,
  size = 40,
  iconSize,
  iconName = 'chevron-back',
  iconColor = '#fff',
  style,
  containerStyle,
  absolute = false,
  top = 0,
  left = 0,
  ...props
}) => {
  const navigation = useNavigation();
  
  // Calculate responsive sizes
  const buttonSize = Math.min(size, width * 0.12);
  const calculatedIconSize = iconSize || Math.min(28, buttonSize * 0.7);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const buttonContent = (
    <TouchableOpacity
      style={[
        styles.btn,
        { 
          width: buttonSize, 
          height: buttonSize, 
          borderRadius: buttonSize / 2 
        },
        style
      ]}
      activeOpacity={0.8}
      onPress={handlePress}
      {...props}
    >
      <BlurView
        intensity={45.4}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
        reducedTransparencyFallbackColor="black"
        style={[
          styles.blurViewStyle,
          { borderRadius: buttonSize / 2 }
        ]}
      >
        <View style={styles.iconContainer}>
          <Ionicons 
            name={iconName} 
            size={calculatedIconSize} 
            color={iconColor} 
          />
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  if (absolute) {
    return (
      <View 
        style={[
          styles.absoluteContainer,
          {
            top,
            left,
          },
          containerStyle
        ]} 
        pointerEvents="box-none"
      >
        {buttonContent}
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]} pointerEvents="box-none">
      {buttonContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    pointerEvents: 'box-none',
  },
  absoluteContainer: {
    position: 'absolute',
    zIndex: 100,
    alignItems: 'flex-start',
    pointerEvents: 'box-none',
  },
  btn: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor: 'transparent',
  },
  blurViewStyle: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
      },
      android: {
        elevation: 20,
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