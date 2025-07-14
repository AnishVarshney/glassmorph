import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

const HomeScreen = () => {
  const [selected, setSelected] = useState(0);
  return (
    <View style={styles.container}>
      <OptionsToggle />
      <BackButton />
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, <Text style={styles.userName}>John Doe</Text></Text>
      </View>
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
  header: {
    marginTop: 60,
    marginBottom: 18,
    paddingHorizontal: 24,
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