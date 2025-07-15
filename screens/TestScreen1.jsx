import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import Carousel from '../components/Carousel';
import BackButton from '../components/BackButton';

const { width, height } = Dimensions.get('window');

// Mock data for radio stations
const radioStations = [
  {
    id: 1,
    name: 'Chill Vibes',
    genre: 'Ambient',
    listeners: '2.4K',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    color: '#FF6B6B',
  },
  {
    id: 2,
    name: 'Jazz Lounge',
    genre: 'Jazz',
    listeners: '1.8K',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
    color: '#4ECDC4',
  },
  {
    id: 3,
    name: 'Rock Classics',
    genre: 'Rock',
    listeners: '5.2K',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    color: '#45B7D1',
  },
  {
    id: 4,
    name: 'Electronic Dreams',
    genre: 'Electronic',
    listeners: '3.1K',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
    color: '#96CEB4',
  },
  {
    id: 5,
    name: 'Hip Hop Central',
    genre: 'Hip Hop',
    listeners: '4.7K',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    color: '#FFEAA7',
  },
];

// Mock data for featured content
const featuredContent = [
  {
    id: 1,
    title: 'Top Hits Today',
    subtitle: 'The best songs right now',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
  },
  {
    id: 2,
    title: 'New Releases',
    subtitle: 'Fresh music this week',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
  },
  {
    id: 3,
    title: 'Discover Weekly',
    subtitle: 'Personalized for you',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
  },
];

// Enhanced featured content for carousel
const carouselData = [
  {
    id: 1,
    title: 'Summer Vibes',
    subtitle: 'Feel the rhythm of summer',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
  },
  {
    id: 2,
    title: 'Late Night Jazz',
    subtitle: 'Smooth jazz for your evening',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
  },
  {
    id: 3,
    title: 'Electronic Beats',
    subtitle: 'Pulse-pounding electronic music',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
  },
  {
    id: 4,
    title: 'Classical Masterpieces',
    subtitle: 'Timeless classical compositions',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
  },
];

export default function App() {
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollViewRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCarouselPress = (item, index) => {
    console.log('Carousel item pressed:', item.title);
    // Handle carousel item press
  };

  const StationCard = ({ station, index }) => (
    <TouchableOpacity
      style={styles.stationCard}
      onPress={() => setCurrentStation(station)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[station.color + '20', station.color + '40']}
        style={styles.stationGradient}
      >
        <View style={styles.stationGlass}>
          <Image source={{ uri: station.image }} style={styles.stationImage} />
          <View style={styles.stationInfo}>
            <Text style={styles.stationName}>{station.name}</Text>
            <Text style={styles.stationGenre}>{station.genre}</Text>
            <View style={styles.listenerCount}>
              <Ionicons name="radio" size={12} color="#fff" />
              <Text style={styles.listenerText}>{station.listeners} listening</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const FeaturedCard = ({ item, index }) => (
    <TouchableOpacity style={styles.featuredCard} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.featuredGradient}
      >
        <Text style={styles.featuredTitle}>{item.title}</Text>
        <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      <BackButton/>
      
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Good Evening</Text>
              <Text style={styles.userName}>Music Lover</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileGlass}>
                <Ionicons name="person-circle" size={40} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Carousel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <Carousel data={carouselData} onItemPress={handleCarouselPress} />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionGlass}>
                <Ionicons name="search" size={24} color="#fff" />
                <Text style={styles.quickActionText}>Search</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionGlass}>
                <Ionicons name="heart" size={24} color="#fff" />
                <Text style={styles.quickActionText}>Favorites</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionGlass}>
                <Ionicons name="download" size={24} color="#fff" />
                <Text style={styles.quickActionText}>Downloads</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Radio Stations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Radio</Text>
          <View style={styles.stationsGrid}>
            {radioStations.map((station, index) => (
              <StationCard key={station.id} station={station} index={index} />
            ))}
          </View>
        </View>

        {/* Recently Played */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentContainer}
          >
            {radioStations.slice(0, 3).map((station, index) => (
              <TouchableOpacity key={station.id} style={styles.recentCard}>
                <Image source={{ uri: station.image }} style={styles.recentImage} />
                <Text style={styles.recentName}>{station.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Now Playing Bar */}
      {currentStation && (
        <View style={styles.nowPlayingBar}>
          <LinearGradient
            colors={[currentStation.color + '40', currentStation.color + '20']}
            style={styles.nowPlayingGradient}
          >
            <View style={styles.nowPlayingContent}>
              <Image source={{ uri: currentStation.image }} style={styles.nowPlayingImage} />
              <View style={styles.nowPlayingInfo}>
                <Text style={styles.nowPlayingName}>{currentStation.name}</Text>
                <Text style={styles.nowPlayingGenre}>{currentStation.genre}</Text>
              </View>
              <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
                <View style={styles.playButtonGlass}>
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={24}
                    color="#fff"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <LinearGradient
          colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
          style={styles.bottomNavGradient}
        >
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color="#fff" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="search" size={24} color="#fff" />
            <Text style={styles.navText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="library" size={24} color="#fff" />
            <Text style={styles.navText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="settings" size={24} color="#fff" />
            <Text style={styles.navText}>Settings</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerGradient: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileGlass: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 3,
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
  },
  quickActionGlass: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  quickActionText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 8,
    fontWeight: '600',
  },
  featuredContainer: {
    paddingRight: 20,
  },
  featuredCard: {
    width: width * 0.8,
    height: 200,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  stationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stationCard: {
    width: (width - 50) / 2,
    height: 180,
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  stationGradient: {
    flex: 1,
    borderRadius: 20,
  },
  stationGlass: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  stationImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10,
  },
  stationInfo: {
    alignItems: 'center',
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  stationGenre: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 8,
  },
  listenerCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listenerText: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.7,
    marginLeft: 4,
  },
  recentContainer: {
    paddingRight: 20,
  },
  recentCard: {
    width: 120,
    marginRight: 15,
    alignItems: 'center',
  },
  recentImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  recentName: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  nowPlayingBar: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    height: 70,
  },
  nowPlayingGradient: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  nowPlayingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nowPlayingImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  nowPlayingInfo: {
    flex: 1,
  },
  nowPlayingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  nowPlayingGenre: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  playButtonGlass: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  bottomNavGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
});
