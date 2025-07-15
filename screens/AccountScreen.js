import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import GlassCard from '../components/GlassCard';
import SettingsOptionRow from '../components/SettingsOptionRow';
import SettingsButton from '../components/SettingsButton';

const OPTIONS = [
  { label: 'Email', icon: 'mail-outline', iconType: 'Ionicons', screen: null },
  { label: 'Subscription', icon: 'card-outline', iconType: 'Ionicons', screen: null },
  { label: 'Personalization', icon: 'color-palette-outline', iconType: 'Ionicons', screen: null },
  { label: 'Change Password', icon: 'key-outline', iconType: 'Ionicons', screen: 'ChangePassword' },
];

const AccountScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Accounts" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <GlassCard style={styles.card}>
          {OPTIONS.map((opt, idx) => (
            <SettingsOptionRow
              key={opt.label}
              icon={opt.icon}
              iconType={opt.iconType}
              label={opt.label}
              showArrow={!!opt.screen}
              onPress={opt.screen ? () => navigation.navigate(opt.screen) : undefined}
              style={idx === OPTIONS.length - 1 ? { borderBottomWidth: 0 } : undefined}
            />
          ))}
          <View style={{ height: 18 }} />
          <SettingsButton
            title="Delete account"
            onPress={() => {}}
            variant="danger"
            style={{ marginBottom: 0 }}
          />
        </GlassCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
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

export default AccountScreen; 