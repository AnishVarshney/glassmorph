
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';

const StationsScreen = () => {
  return (
    <ScreenWrapper>
      {/* <View style={styles.backButtonContainer}> */}
        <BackButton />
      {/* </View> */}
      {/* Add more content here later */}
    </ScreenWrapper>
  );
};

export default StationsScreen;

const styles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
  },
});