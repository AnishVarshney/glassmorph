import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackButton from '../components/BackButton';
import NoFavorites from '../components/NoFavorites';
import ScreenWrapper from '../components/ScreenWrapper';

const FavoritesScreen = () => (
  <ScreenWrapper>
    <View style={styles.container}>
      <BackButton />
      <NoFavorites onExplore={() => {}} />
    </View>
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
});

export default FavoritesScreen; 