import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// Import the provided components
import GlassCard from '../components/GlassCard';
import BackButton from '../components/BackButton';
import OptionsToggle from '../components/OptionsToggle';
import Carousel from '../components/Carousel';

const { width, height } = Dimensions.get('window');

const PlayerScreen = () => {
  // Sample data for the carousel
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

  const [currentTrack, setCurrentTrack] = useState(albumData[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0.6);

  const handleCarouselItemPress = (item, index) => {
    setCurrentTrack(item);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Glassy gradient background */}
      <LinearGradient
        colors={["rgba(255,255,255,0.13)", "rgba(255,255,255,0.07)"]}
        style={StyleSheet.absoluteFill}
      />
      {/* Optional: Add BlurView for extra glass effect */}
      <BlurView
        intensity={45.4}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea}>
        {/* Top Section with Back Button and Options */}
        <View style={styles.topSection}>
          <BackButton />
          <View style={styles.topCenter}>
            <Text style={styles.playingFromText}>PLAYING FROM ARTIST</Text>
            <Text style={styles.artistName}>The Weeknd</Text>
          </View>
          <OptionsToggle />
        </View>



        {/* Carousel Section */}
        <View style={styles.carouselSection}>
          <Carousel
            data={albumData}
            onItemPress={handleCarouselItemPress}
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

        {/* Progress Bar Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.liveText}>LIVE</Text>
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
            <GlassCard style={styles.playButtonGlass} intensity={30}>
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={36} 
                color="#fff" 
                style={styles.playIcon}
              />
            </GlassCard>
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
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
  backgroundBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20,20,20,0.9)',
  },
  gradientOverlay: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 0,
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
    flex: 1,
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
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  liveText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    letterSpacing: 1,
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