import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';
import PlayerBar from '../components/PlayerBar';
import RecentStationRow from '../components/RecentStationRow';
import RecentStationGridCard from '../components/RecentStationGridCard';

const RECENTS = [
  { id: '1', title: 'Station 01' },
  { id: '2', title: 'Station 01' },
  { id: '3', title: 'Station 01' },
  { id: '4', title: 'Station 01' },
  { id: '5', title: 'Station 01' },
  { id: '6', title: 'Station 01' },
  { id: '7', title: 'Station 01' },
  { id: '8', title: 'Station 01' },
];

const RecentsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [isGridView, setIsGridView] = useState(false);

  return (
    <ScreenWrapper>
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + 16,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        ]}
      >
          <BackButton />
        <View style={styles.headerRow}>
          <Text style={styles.header}>Recents</Text>
          <View style={styles.toggleGroup}>
            <TouchableOpacity onPress={() => setIsGridView(false)} style={isGridView ? styles.toggleBtn : styles.toggleBtnActive}>
              <Ionicons name="list" size={22} color={isGridView ? '#aaa' : '#fff'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsGridView(true)} style={!isGridView ? styles.toggleBtn : styles.toggleBtnActive}>
              <Ionicons name="grid" size={22} color={!isGridView ? '#aaa' : '#fff'} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={RECENTS}
          renderItem={({ item }) =>
            isGridView
              ? <RecentStationGridCard title={item.title} />
              : <RecentStationRow title={item.title} />
          }
          keyExtractor={item => item.id}
          numColumns={isGridView ? 2 : 1}
          key={isGridView ? 'grid' : 'list'} // force re-render on toggle
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
        <PlayerBar />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 8,
  },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
    marginRight: 100,
  },
  toggleGroup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 8,
  },
  toggleBtn: {
    padding: 8,
    opacity: 0.7,
  },
  toggleBtnActive: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.18)',
    opacity: 1,
  },
});

export default RecentsScreen; 