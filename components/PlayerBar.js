import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_HEIGHT } from './CustomTabBar';
import { useNavigation } from '@react-navigation/native';
// import { BlurView } from 'expo-blur'; // Uncomment for real blur

const { width } = Dimensions.get('window');

// Responsive sizing based on screen width
const BAR_WIDTH = Math.max(220, Math.min(width * 0.88, 370)); // 88% of screen, min 220, max 370
const BAR_HEIGHT = Math.max(56, Math.min(width * 0.17, 70)); // 17% of screen, min 56, max 70
const BAR_RADIUS = BAR_HEIGHT / 2;
const ALBUM_SIZE = BAR_HEIGHT * 0.63;
const ICON_SIZE = Math.round(BAR_HEIGHT * 0.38);
const PLAY_SIZE = Math.round(BAR_HEIGHT * 0.54);

const PlayerBar = ({
  image = 'https://i.scdn.co/image/ab67616d0000b273e0e1e1e1e1e1e1e1e1e1e1e1',
  title = 'Timeless',
  subtitle = 'The Weeknd',
  style,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate('Player')}
      style={[
        styles.floatingContainer,
        {
          bottom: TAB_BAR_HEIGHT + 16 + (insets.bottom > 0 ? insets.bottom : 0),
          width: BAR_WIDTH,
        },
        style,
      ]}
      pointerEvents="box-none"
    >
      {/* <BlurView intensity={45} tint="dark" style={[styles.glass, { width: BAR_WIDTH, height: BAR_HEIGHT, borderRadius: BAR_RADIUS }]}> */}
      <LinearGradient
        colors={["rgba(255,255,255,0.20)", "rgba(255,255,255,0.07)"]}
        style={[
          styles.glass,
          {
            width: BAR_WIDTH,
            height: BAR_HEIGHT,
            borderRadius: BAR_RADIUS,
            shadowRadius: 20,
            shadowOpacity: 0.15,
          },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.contentRow}>
          <Image source={{ uri: image }} style={{ width: ALBUM_SIZE, height: ALBUM_SIZE, borderRadius: ALBUM_SIZE / 3, marginRight: BAR_HEIGHT * 0.18, backgroundColor: '#222' }} />
          <View style={styles.textContainer}>
            <Text style={[styles.title, { fontSize: BAR_HEIGHT * 0.28 }]} numberOfLines={1}>{title}</Text>
            <Text style={[styles.subtitle, { fontSize: BAR_HEIGHT * 0.19 }]} numberOfLines={1}>{subtitle}</Text>
          </View>
          <View style={styles.iconRow}>
            <TouchableOpacity style={[styles.iconButton, { width: ICON_SIZE, height: ICON_SIZE, borderRadius: ICON_SIZE / 2 }]} activeOpacity={0.7}>
              <Ionicons name="heart-outline" size={ICON_SIZE * 0.9} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { width: ICON_SIZE, height: ICON_SIZE, borderRadius: ICON_SIZE / 2 }]} activeOpacity={0.7}>
              <Ionicons name="add-circle-outline" size={ICON_SIZE * 0.9} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.playButton, { width: PLAY_SIZE, height: PLAY_SIZE, borderRadius: PLAY_SIZE / 2 }]} activeOpacity={0.7}>
              <Ionicons name="play" size={PLAY_SIZE * 0.7} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 101,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  glass: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(255,255,255,0.20)',
    overflow: 'hidden',
    paddingHorizontal: 16,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 2,
    letterSpacing: 0.1,
  },
  subtitle: {
    color: '#fff',
    opacity: 0.7,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconButton: {
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  playButton: {
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
});

export default PlayerBar; 