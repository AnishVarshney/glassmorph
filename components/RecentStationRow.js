import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import GlassCard from './GlassCard';
import { Ionicons } from '@expo/vector-icons';

const RecentStationRow = ({ title, image, onFavorite, onMore }) => (
  <GlassCard style={styles.card} intensity={45.4}>
    <View style={styles.inner}>
      <View style={styles.thumb}>
        {image ? (
          <Image source={image} style={styles.img} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={onFavorite}>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMore} style={{ marginLeft: 12 }}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  </GlassCard>
);

const styles = StyleSheet.create({
  card: {
    height: 48,
    borderRadius: 12,
    marginVertical: 7,
    marginHorizontal: 8,
    padding: 0,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 0,
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
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
});

export default RecentStationRow; 