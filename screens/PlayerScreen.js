import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Grain from '../assets/Grain.png'; // PNG grain texture
import BackButton from '../components/BackButton';
import OptionsToggle from '../components/OptionsToggle';
import Carousel from '../components/Carousel';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const albumData = [
  {
    id: 1,
    image: 'https://i.scdn.co/image/ab67616d0000b273ef017e899c0547766997d874',
    title: 'Timeless',
    subtitle: 'The Weeknd',
    album: 'HURRY UP TOMORROW',
  },
  {
    id: 2,
    image: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    title: 'Blinding Lights',
    subtitle: 'The Weeknd',
    album: 'After Hours',
  },
  {
    id: 3,
    image: 'https://i.scdn.co/image/ab67616d0000b273274b406a7e18acebcf743079',
    title: 'Save Your Tears',
    subtitle: 'The Weeknd',
    album: 'After Hours',
  },
];

const IMAGE_WIDTH = Math.min(width * 0.8, 321);

const PlayerScreen = () => {
  const [currentTrack, setCurrentTrack] = useState(albumData[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0.6);

  const handleCarouselItemPress = (item, index) => {
    setCurrentTrack(item);
  };

  const handleCarouselIndexChanged = (index) => {
    setCurrentTrack(albumData[index]);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 1. Fullscreen Album Image */}
      <Image
        source={{ uri: currentTrack.image }}
        style={StyleSheet.absoluteFill}
        resizeMode='stretch'
        blurRadius={0}
      />
      {/* 2. Black Overlay */}
      <View style={styles.blackOverlay} pointerEvents="none" />
      {/* 3. Grain Overlay */}
      <Image
        source={Grain}
        style={[StyleSheet.absoluteFill, { opacity: 0.08, zIndex: 2 }]}
        resizeMode="cover"
        pointerEvents="none"
      />
      {/* 4. White Overlay */}
      <View style={styles.whiteOverlay} pointerEvents="none" />
      {/* 5. Blur */}
      <BlurView
        intensity={100}
        tint="dark"
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {/* 6. Foreground Content */}
      <SafeAreaView style={styles.safeArea}>
        {/* Top floating buttons */}
        <BackButton
          size={40}
          containerStyle={{
            position: 'absolute',
            left: 16,
            top: 111,
            zIndex: 100,
            marginRight: 16,
          }}
        />
        <OptionsToggle
          containerStyle={{
            position: 'absolute',
            right: 16,
            top: 0,
            zIndex: 100,
          }}
        />
        {/* Top Center Info */}
        <View style={styles.topCenter}>
          <Text style={styles.playingFromText}>PLAYING FROM ARTIST</Text>
          <Text style={styles.artistName}>The Weeknd</Text>
        </View>
        {/* Carousel Section */}
        <View style={styles.carouselSection}>
          <Carousel
            data={albumData}
            onItemPress={handleCarouselItemPress}
            onIndexChanged={handleCarouselIndexChanged}
            style={styles.carousel}
          />
        </View>
        {/* Track Info Section */}
        <View style={styles.trackInfoSection}>
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{currentTrack.title}</Text>
            <Text style={styles.trackArtist}>{currentTrack.subtitle}</Text>
          </View>
          <View style={styles.trackActions}>
            <TouchableOpacity style={styles.heartButton}>
              <Ionicons name="heart-outline" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
              <View style={styles.menuLines}>
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* LIVE Bar Section */}
        <View style={styles.liveBarWrapper}>
          <View style={styles.liveBarRow}>
            <LinearGradient
              colors={[
                'rgba(255,255,255,0.9)', // 0%
                'rgba(191,191,191,0)',   // 40%
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.liveBarHalf}
            />
            <Text style={styles.liveText}>LIVE</Text>
            <LinearGradient
              colors={[
                'rgba(191,191,191,0)',   // 60%
                'rgba(255,255,255,0.9)', // 100%
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.liveBarHalf}
            />
          </View>
        </View>
        {/* Media Controls */}
        <View style={styles.controlsSection}>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="play-skip-back" size={32} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <View style={styles.playButtonGlass}>
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={36} 
                color="#fff" 
                style={styles.playIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="play-skip-forward" size={32} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  blackOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.25,
    zIndex: 1,
  },
  whiteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    opacity: 0.03,
    zIndex: 3,
  },
  safeArea: {
    flex: 1,
    zIndex: 10,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  topCenter: {
    alignItems: 'center',
    // flex: 1,
  },
  playingFromText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    letterSpacing: 1,
  },
  artistName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginTop: 2,
  },
  explicitWarning: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  explicitBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  explicitText: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  carouselSection: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 20,
  },
  carousel: {
    height: 300,
  },
  trackInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  trackArtist: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '400',
  },
  trackActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartButton: {
    marginRight: 20,
  },
  menuButton: {
    padding: 4,
  },
  menuLines: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  liveBarWrapper: {
    alignItems: 'center',
    marginVertical: 18,
  },
  liveBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: IMAGE_WIDTH,
    height: 7,
  },
  liveBarHalf: {
    flex: 1,
    height: 7,
    borderRadius: 3.5,
  },
  liveText: {
    color: 'rgba(255,255,255,0.7)',
    height:  18,
    fontSize: 15,
    fontFamily: 'DMSans-Bold', // Make sure DM Sans is loaded in your project
    fontWeight: 'bold',
    letterSpacing: 1,
    marginHorizontal: 12,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  controlsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  controlButton: {
    padding: 20,
  },
  playButton: {
    marginHorizontal: 30,
  },
  playButtonGlass: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  playIcon: {
    marginLeft: 2,
  },
  bottomNav: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bottomNavGlass: {
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bottomNavContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  navItem: {
    padding: 10,
  },
});

export default PlayerScreen;