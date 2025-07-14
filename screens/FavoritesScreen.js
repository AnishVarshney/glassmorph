import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackButton from '../components/BackButton';
import NoFavorites from '../components/NoFavorites';

const FavoritesScreen = () => (
  <View style={styles.container}>
    <BackButton />
    <NoFavorites onExplore={() => {}} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default FavoritesScreen; 