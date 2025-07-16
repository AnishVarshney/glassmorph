import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import GlassCard from './GlassCard';

const StationCard = ({ title, image, cardWidth }) => (
  <GlassCard style={[styles.card, { width: cardWidth }]} intensity={45.4}>
    <View style={styles.inner}>
      <View style={styles.thumb}>
        {image ? (
          <Image source={image} style={styles.img} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  </GlassCard>
);

const styles = StyleSheet.create({
  card: {
    height: 48,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    margin: 4,
    
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 0,
  },
  thumb: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#BDBDBD',
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#BDBDBD',
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    flex: 1,
  },
});

export default StationCard; 