import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import GlassCard from './GlassCard';
import { Ionicons } from '@expo/vector-icons';

const RecentStationRow = ({ title, image, onFavorite, onMore }) => (
  <GlassCard
    style={styles.card}
    contentStyle={styles.inner}
    intensity={45.4}
  >
    <View style={styles.thumb}>
      {image ? (
        <Image source={image} style={styles.img} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.rightIcons}>
      <TouchableOpacity onPress={onFavorite} style={styles.iconButton}>
        <Ionicons name="heart-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onMore} style={[styles.iconButton, { marginLeft: 12 }]}> 
        <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  </GlassCard>
);

const styles = StyleSheet.create({
  card: {
    height: 56, // Match Figma or screenshot
    borderRadius: 16, // Match Figma or screenshot
    marginVertical: 7,
    marginHorizontal: 8,
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: 'center',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16, // Horizontal padding for content
    height: '100%',
  },
  thumb: {
    width: 40, // Match Figma or screenshot
    height: 40,
    borderRadius: 10,
    backgroundColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 12, // Space between thumb and title
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#BDBDBD',
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RecentStationRow; 