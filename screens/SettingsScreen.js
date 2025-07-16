import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import GlassCard from '../components/GlassCard';
import SettingsOptionRow from '../components/SettingsOptionRow';
import SettingsButton from '../components/SettingsButton';
import ScreenWrapper from '../components/ScreenWrapper';

const OPTIONS = [
  { label: 'Account', icon: 'person-outline', screen: 'Account', iconType: 'Ionicons' },
  // { label: 'Playback', icon: 'play-circle-outline', screen: null, iconType: 'Ionicons' },
  { label: 'Privacy', icon: 'lock-closed-outline', screen: null, iconType: 'Ionicons' },
  { label: 'Notification', icon: 'notifications-outline', screen: null, iconType: 'Ionicons' },
  { label: 'Media quality', icon: 'musical-notes-outline', screen: null, iconType: 'Ionicons' },
  { label: 'About', icon: 'information-circle-outline', screen: null, iconType: 'Ionicons' },
];

const SettingsScreen = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader title="Settings" navigation={navigation} />
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <GlassCard style={styles.card}>
            {OPTIONS.map((opt, idx) => (
              <SettingsOptionRow
                key={opt.label}
                icon={opt.icon}
                iconType={opt.iconType}
                label={opt.label}
                showArrow
                onPress={opt.screen ? () => navigation.navigate(opt.screen) : undefined}
                style={idx === OPTIONS.length - 1 ? { borderBottomWidth: 0 } : undefined}
              />
            ))}
            <View style={{ height: 12 }} />
            <View style={{ height: 32 }} /> 
            <SettingsOptionRow
              icon="chatbox-ellipses-outline"
              iconType="Ionicons"
              label="Feedback"
              onPress={() => {}}
              showArrow={false}
            />
            <SettingsOptionRow
              icon="log-out-outline"
              iconType="Ionicons"
              label="Sign out"
              onPress={() => navigation.navigate('Auth')}
              showArrow={false}
            />
          </GlassCard>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0A0A0A',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  card: {
    marginTop: 24,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export default SettingsScreen; 