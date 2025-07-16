import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';
import PlayerBar from '../components/PlayerBar';
import RecentStationRow from '../components/RecentStationRow';

const RECENTS = [
  { id: '1', title: 'Station 01' },
  { id: '2', title: 'Station 01' },
  { id: '3', title: 'Station 01' },
  { id: '4', title: 'Station 01' },
  { id: '5', title: 'Station 01' },
  { id: '6', title: 'Station 01' },
  { id: '7', title: 'Station 01' },
];

const RecentsScreen = ({ navigation }) => (
  <ScreenWrapper>
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.header}>Recents</Text>
      <FlatList
        data={RECENTS}
        renderItem={({ item }) => <RecentStationRow title={item.title} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />
      <PlayerBar />
    </View>
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 60,
    marginBottom: 18,
    marginTop: 8,
  },
});

export default RecentsScreen; 