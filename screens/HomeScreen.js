import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OptionsToggle from '../components/OptionsToggle';
import BackButton from '../components/BackButton';
import CategoryCarousel from '../components/CategoryCarousel';
import SongCarousel from '../components/SongCarousel';

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

const HomeScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(0);
  return (
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
      {/* Divider (optional, for Figma look) */}
      <View style={styles.headerDivider} />
      <Text style={styles.sectionTitle}>Select Categories</Text>
      <CategoryCarousel
        categories={CATEGORIES}
        selected={selected}
        onSelect={setSelected}
      />
      <SongCarousel
        title="Popular Songs"
        songs={SONGS}
        onPressSong={() => {}}
        onSeeAll={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
});

export default HomeScreen; 