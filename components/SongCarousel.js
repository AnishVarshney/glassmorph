import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_SIZE = Math.floor(width * 0.34);
const CARD_RADIUS = 16;

const SongCarousel = ({
  title = 'Popular Songs',
  songs = [],
  onPressSong,
  onSeeAll,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.7} onPress={onSeeAll}>
          <Text style={styles.seeAllText}>See all</Text>
          <Ionicons name="chevron-forward" size={16} color="#fff" style={{ marginLeft: 2, marginTop: 1 }} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces
      >
        {songs.map((song, idx) => (
          <TouchableOpacity
            key={song.id || idx}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => onPressSong && onPressSong(song, idx)}
          >
            <Image source={{ uri: song.image }} style={styles.cardImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  seeAllText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.85,
  },
  scrollContent: {
    paddingLeft: 12,
    paddingRight: 8,
    alignItems: 'center',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 6,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: CARD_RADIUS,
    resizeMode: 'cover',
  },
});

export default SongCarousel; 