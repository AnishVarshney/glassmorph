import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const ScreenHeader = ({ title, navigation, style }) => {
  const canGoBack = navigation?.canGoBack?.();
  return (
    <BlurView intensity={40} tint="dark" style={[styles.blur, style]}>
      <View style={styles.row}>
        {canGoBack ? (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.backBtn} />
        )}
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {/* Spacer for symmetry */}
        <View style={styles.backBtn} />
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blur: {
    paddingTop: Platform.OS === 'ios' ? 56 : 36,
    paddingBottom: 18,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.1,
    opacity: 0.95,
  },
});

export default ScreenHeader; 