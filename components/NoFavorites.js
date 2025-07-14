import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const NoFavorites = ({ onExplore }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="heart-outline" size={width * 0.28} color="#fff" style={styles.heartIcon} />
      <Text style={styles.title}>No Favorites</Text>
      <View style={styles.subtitleRow}>
        <Text style={styles.subtitle}>Start adding Stations to your favorites by clicking the </Text>
        <Ionicons name="heart-outline" size={18} color="#fff" style={{ opacity: 0.5, marginBottom: -2, marginHorizontal: 4 }} />
        <Text style={styles.subtitle}>icon</Text>
      </View>
      <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.8} onPress={onExplore}>
        <Text style={styles.ctaText}>Explore stations</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    width: '100%',
  },
  heartIcon: {
    opacity: 0.13,
    marginBottom: 32,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.5,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 22,
  },
  ctaBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
});

export default NoFavorites; 