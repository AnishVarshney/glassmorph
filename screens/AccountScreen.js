import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import GlassCard from '../components/GlassCard';
import SettingsOptionRow from '../components/SettingsOptionRow';
import ScreenWrapper from '../components/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';

const OPTIONS = [
  { label: 'Email', icon: 'mail-outline', iconType: 'Ionicons', screen: null },
  { label: 'Subscription', icon: 'card-outline', iconType: 'Ionicons', screen: null },
  { label: 'Personalization', icon: 'color-palette-outline', iconType: 'Ionicons', screen: null },
  { label: 'Change Password', icon: 'key-outline', iconType: 'Ionicons', screen: 'ChangePassword' },
];

const AccountScreen = ({ navigation }) => {
  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <ScreenHeader title="Accounts" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pro Section */}
        <GlassCard style={styles.proCard}>
          <View style={styles.proRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.proTitle}>Want more features?</Text>
              <Text style={styles.proSubtitle}>Upgrade to unlock</Text>
              <TouchableOpacity style={styles.proButton} onPress={() => {}}>
                <Text style={styles.proButtonText}>Get Pro</Text>
              </TouchableOpacity>
            </View>
            <Ionicons name="flash-sharp" size={48} color="#FF3B30" style={styles.proIcon} />
          </View>
        </GlassCard>
        {/* Main Options */}
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
          <Text style={styles.deleteText}>Delete account</Text>
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
  proCard: {
    marginTop: 24,
    marginBottom: 18,
    padding: 20,
  },
  proRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 2,
  },
  proSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginBottom: 10,
  },
  proButton: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    marginTop: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  proButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  proIcon: {
    marginLeft: 18,
  },
  card: {
    marginTop: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    marginTop: 18,
    marginBottom: 2,
    paddingLeft: 2,
  },
});

export default AccountScreen; 