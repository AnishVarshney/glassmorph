import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';
import PlayerBar from '../components/PlayerBar';
import RecentStationRow from '../components/RecentStationRow';
import RecentStationGridCard from '../components/RecentStationGridCard';

const { width, height } = Dimensions.get('window');

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

  // Calculate responsive dimensions
  const headerTopPadding = insets.top + 60; // Space for back button + extra padding
  const horizontalPadding = Math.max(16, width * 0.04); // Responsive horizontal padding
  const toggleButtonSize = Math.min(44, width * 0.11); // Responsive toggle button size

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Back Button - Positioned absolutely like in target design */}
        <BackButton 
          containerStyle={[
            styles.backButtonContainer,
            {
              top: insets.top + 16,
              left: horizontalPadding,
            }
          ]}
          size={Math.min(40, width * 0.1)}
        />

        {/* Toggle Buttons - Positioned absolutely in top-right */}
        <View 
          style={[
            styles.toggleContainer,
            {
              top: insets.top + 16,
              right: horizontalPadding,
            }
          ]}
        >
          <View style={[styles.toggleGroup, { height: toggleButtonSize }]}>
            <TouchableOpacity 
              onPress={() => setIsGridView(false)} 
              style={[
                styles.toggleBtn,
                isGridView ? styles.toggleBtnInactive : styles.toggleBtnActive,
                { width: toggleButtonSize, height: toggleButtonSize }
              ]}
            >
              <Ionicons 
                name="list" 
                size={Math.min(22, width * 0.055)} 
                color={isGridView ? 'rgba(255,255,255,0.5)' : '#fff'} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setIsGridView(true)} 
              style={[
                styles.toggleBtn,
                !isGridView ? styles.toggleBtnInactive : styles.toggleBtnActive,
                { width: toggleButtonSize, height: toggleButtonSize }
              ]}
            >
              <Ionicons 
                name="grid" 
                size={Math.min(22, width * 0.055)} 
                color={!isGridView ? 'rgba(255,255,255,0.5)' : '#fff'} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <View 
          style={[
            styles.contentContainer,
            {
              paddingTop: headerTopPadding,
              paddingHorizontal: horizontalPadding,
              paddingBottom: insets.bottom + 120, // Space for PlayerBar
            }
          ]}
        >
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={[styles.header, { fontSize: Math.min(32, width * 0.08) }]}>
              Recents
            </Text>
          </View>

          {/* List */}
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
            contentContainerStyle={[
              styles.listContent,
              {
                paddingBottom: 20,
              }
            ]}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={isGridView ? styles.gridRow : null}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          />
        </View>

        {/* Player Bar */}
        <PlayerBar />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    position: 'relative',
  },
  backButtonContainer: {
    position: 'absolute',
    zIndex: 100,
  },
  toggleContainer: {
    position: 'absolute',
    zIndex: 100,
    alignItems: 'flex-end',
  },
  toggleGroup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  toggleBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  toggleBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  toggleBtnInactive: {
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  header: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  listContent: {
    flexGrow: 1,
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
});

export default RecentsScreen;