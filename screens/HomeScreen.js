import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import CategoryCarousel from '../components/CategoryCarousel';
import SongCarousel from '../components/SongCarousel';
import StoryCard from '../components/StoryCard';
import ScreenWrapper from '../components/ScreenWrapper';
import PlayerBar from '../components/PlayerBar';

const CATEGORIES = [
  'All',
  'Party',
  'Hip Hop',
  'Sad',
  'Podcast',
  'Chill',
  'Workout',
  'Jazz',
  'Pop',
];

const SONGS = [
  {
    id: 1,
    image: 'https://i.scdn.co/image/ab67616d0000b273e0e1e1e1e1e1e1e1e1e1e1e1',
    title: 'Hurry Up Tomorrow',
  },
  {
    id: 2,
    image: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Virginia_V_-_Chili_Peppers.png',
    title: 'Chili Peppers',
  },
  {
    id: 3,
    image: 'https://upload.wikimedia.org/wikipedia/en/2/2e/ACDC_-_The_Razors_Edge.JPG',
    title: 'The Razors Edge',
  },
  {
    id: 4,
    image: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Weeknd_-_After_Hours.png',
    title: 'After Hours',
  },
];

// Story stations data with different background colors for variety
const STORY_STATIONS = [
  { 
    id: '1', 
    title: 'Station 01',
    backgroundColor: 'rgba(255, 255, 255, 0.1)' // Default gray
  },
  { 
    id: '2', 
    title: 'Station 01',
    backgroundColor: 'rgba(255, 182, 193, 0.3)' // Light pink
  },
  { 
    id: '3', 
    title: 'Station 01',
    backgroundColor: 'rgba(255, 255, 255, 0.1)' // Default gray
  },
  { 
    id: '4', 
    title: 'Station 01',
    backgroundColor: 'rgba(255, 182, 193, 0.3)' // Light pink
  },
  { 
    id: '5', 
    title: 'Station 01',
    backgroundColor: 'rgba(255, 255, 255, 0.1)' // Default gray
  },
  { 
    id: '6', 
    title: 'Station 01',
    backgroundColor: 'rgba(255, 182, 193, 0.3)' // Light pink
  },
  { 
    id: '7', 
    title: 'Station 01',
    backgroundColor: 'rgba(255, 255, 255, 0.1)' // Default gray
  },
  { 
    id: '8', 
    title: 'Station 01',
    backgroundColor: 'rgba(255, 182, 193, 0.3)' // Light pink
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(0);

  const handleStoryPress = (station) => {
    console.log('Story pressed:', station.title);
    // Navigate to station or handle story press
  };

  const renderStoryCard = ({ item, index }) => (
    <StoryCard
      title={item.title}
      backgroundColor={item.backgroundColor}
      onPress={() => handleStoryPress(item)}
      style={[
        styles.storyCard,
        // Add margin for proper spacing
        {
          marginLeft: index % 2 === 0 ? 0 : 6, // Left margin for right column
          marginRight: index % 2 === 0 ? 6 : 0, // Right margin for left column
          marginBottom: 12, // Bottom margin between rows
        }
      ]}
    />
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          {/* Logo (lightning bolt) */}
          <Ionicons name="flash" size={28} color="#FF3C3C" style={styles.logo} />
          {/* Greeting */}
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hello, <Text style={styles.userName}>John Doe</Text></Text>
          </View>
          {/* Right icons */}
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}
              onPress={() => navigation.navigate('Testing')}
            >
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIconBtn}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.headerDivider} />

        {/* Scrollable content starts here */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Genres Section */}
          <Text style={styles.sectionTitle}>Genres</Text>
          <CategoryCarousel
            categories={CATEGORIES}
            selected={selected}
            onSelect={setSelected}
          />

          {/* Story Cards Section */}
          <View style={styles.storySection}>
            <FlatList
              data={STORY_STATIONS}
              renderItem={renderStoryCard}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.storyGrid}
              columnWrapperStyle={styles.storyRow}
            />
          </View>

          {/* Songs Section */}
          <SongCarousel
            title="Recents"
            songs={SONGS}
            onPressSong={() => {}}
            onSeeAll={() => navigation.navigate('Recents')}
          />
          <SongCarousel
            title="Popular Songs"
            songs={SONGS}
            onPressSong={() => {}}
            onSeeAll={() => navigation.navigate('Recents')}
          />
          <SongCarousel
            title="Popular Songs"
            songs={SONGS}
            onPressSong={() => {}}
            onSeeAll={() => navigation.navigate('Recents')}
          />
          <SongCarousel
            title="Popular Songs"
            songs={SONGS}
            onPressSong={() => {}}
            onSeeAll={() => navigation.navigate('Recents')}
          />
          <SongCarousel
            title="Popular Songs"
            songs={SONGS}
            onPressSong={() => {}}
            onSeeAll={() => navigation.navigate('Recents')}
          />
        </ScrollView>
          <PlayerBar />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 60,
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  logo: {
    marginRight: 8,
    marginTop: 2,
  },
  greetingContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 2,
  },
  greeting: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    opacity: 0.9,
  },
  userName: {
    fontWeight: 'bold',
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerIconBtn: {
    marginLeft: 12,
    padding: 6,
    borderRadius: 16,
  },
  headerDivider: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.13)',
    marginHorizontal: 18,
    marginBottom: 18,
    borderRadius: 2,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginBottom: 8,
    marginTop: 8,
  },
  storySection: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  storyGrid: {
    paddingBottom: 0,
  },
  storyRow: {
    justifyContent: 'space-between',
  },
  storyCard: {
    // Individual card styling handled in component
  },
});

export default HomeScreen;