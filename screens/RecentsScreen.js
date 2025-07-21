import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';
import PlayerBar from '../components/PlayerBar';
import RecentStationRow from '../components/RecentStationRow';
import RecentStationGridCard from '../components/RecentStationGridCard';
import OptionsToggle from '../components/OptionsToggle';

const { width, height } = Dimensions.get('window');

const RECENTS = [
  { id: '1', title: 'Station 01' },
  { id: '2', title: 'Station 03' },
  { id: '3', title: 'Station 04' },
  { id: '4', title: 'Station 05' },
  { id: '5', title: 'Station 06' },
  { id: '6', title: 'Station 07' },
  { id: '7', title: 'Station 08' },
  { id: '8', title: 'Station 09' },
];

const STATION_OPTIONS = [
  { 
    icon: { type: 'Ionicons', name: 'play-circle-outline', size: 24, color: '#fff' }, 
    label: 'Play Station' 
  },
  { 
    icon: { type: 'Ionicons', name: 'heart-outline', size: 24, color: '#fff' }, 
    label: 'Add to Favourites' 
  },
  { 
    icon: { type: 'Ionicons', name: 'share-social-outline', size: 22, color: '#fff' }, 
    label: 'Share Station' 
  },
  { 
    icon: { type: 'Ionicons', name: 'trash-outline', size: 22, color: '#fff' }, 
    label: 'Remove from Recents' 
  },
];

const RecentsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [isGridView, setIsGridView] = useState(false);
  const [recents, setRecents] = useState(RECENTS);
  const [menuState, setMenuState] = useState({
    visible: false,
    position: { x: 0, y: 0, width: 0, height: 0 },
    selectedItem: null,
  });

  // Calculate responsive dimensions
  const horizontalPadding = 20;
  const backButtonSize = 40;
  const toggleButtonSize = 44;

  const handleOpenMenu = (menuData) => {
    setMenuState({
      visible: true,
      position: {
        x: menuData.x,
        y: menuData.y,
        width: menuData.width,
        height: menuData.height,
      },
      selectedItem: { id: menuData.id, title: menuData.title },
    });
  };

  const handleCloseMenu = () => {
    setMenuState(prev => ({
      ...prev,
      visible: false,
    }));
  };

  const handleOptionSelect = (option) => {
    const { selectedItem } = menuState;
    
    switch (option.label) {
      case 'Play Station':
        Alert.alert('Play', `Playing "${selectedItem.title}"`);
        break;
      case 'Add to Favourites':
        Alert.alert('Favorite', `Added "${selectedItem.title}" to favorites`);
        break;
      case 'Share Station':
        Alert.alert('Share', `Sharing "${selectedItem.title}"`);
        break;
      case 'Remove from Recents':
        setRecents(prev => prev.filter(item => item.id !== selectedItem.id));
        Alert.alert('Removed', `"${selectedItem.title}" removed from recents`);
        break;
      default:
        console.log(`Option "${option.label}" selected for ${selectedItem.title}`);
    }
  };

  const handleStationFavorite = (stationTitle) => {
    Alert.alert('Favorite', `Added "${stationTitle}" to favorites`);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header Section */}
        <View 
          style={[
            styles.headerSection,
            {
              paddingTop: insets.top + 16,
              paddingHorizontal: horizontalPadding,
            }
          ]}
        >
          {/* Header Row with Back Button and Title */}
          <View style={styles.headerRow}>
            <BackButton 
              size={backButtonSize}
              containerStyle={styles.backButtonContainer}
            />
            <Text style={styles.headerTitle}>Recents</Text>
          </View>

          {/* Toggle Buttons Row */}
          <View style={styles.toggleRow}>
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
                  size={22} 
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
                  size={22} 
                  color={!isGridView ? 'rgba(255,255,255,0.5)' : '#fff'} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View 
          style={[
            styles.contentContainer,
            {
              paddingHorizontal: horizontalPadding,
              paddingBottom: insets.bottom + 120, // Space for PlayerBar
            }
          ]}
        >
          <FlatList
            data={recents}
            renderItem={({ item }) =>
              isGridView
                ? <RecentStationGridCard 
                    id={item.id}
                    title={item.title}
                    onOpenMenu={handleOpenMenu}
                    onFavorite={handleStationFavorite}
                  />
                : <RecentStationRow 
                    id={item.id}
                    title={item.title} 
                    onOpenMenu={handleOpenMenu}
                    onFavorite={handleStationFavorite}
                  />
            }
            keyExtractor={item => item.id}
            numColumns={isGridView ? 2 : 1}
            key={isGridView ? 'grid' : 'list'}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={isGridView ? styles.gridRow : null}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No recent stations</Text>
              </View>
            )}
          />
        </View>

        {/* Player Bar */}
        <PlayerBar />

        {/* Floating Options Menu */}
        <OptionsToggle
          visible={menuState.visible}
          options={STATION_OPTIONS}
          position={menuState.position}
          onClose={handleCloseMenu}
          onOptionSelect={handleOptionSelect}
          menuWidth={200}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  headerSection: {
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonContainer: {
    marginRight: 16, // Spacing between back button and title
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    flex: 1,
  },
  toggleRow: {
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
  listContent: {
    paddingBottom: 20,
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default RecentsScreen;