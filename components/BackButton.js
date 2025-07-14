import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({
  top = 16,
  left = 16,
  size = 44,
  style,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
//   if (!navigation.canGoBack()) return null;
  return (
    <View style={[styles.container, style, { top: top + insets.top, left }]}
      pointerEvents="box-none"
    >
      <TouchableOpacity
        style={[styles.btn, { width: size, height: size, borderRadius: size / 2 }]}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        {/* <LinearGradient
          colors={["rgba(255,255,255,0.13)", "rgba(255,255,255,0.07)"]}
          style={[styles.btnInner, { borderRadius: size / 2 }]}
        > */}
          <Ionicons name="chevron-back" size={28} color="#fff" />
        {/* </LinearGradient> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  btnInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.18)',
  },
});

export default BackButton; 