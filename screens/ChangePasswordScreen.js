import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import GlassCard from '../components/GlassCard';
import SettingsButton from '../components/SettingsButton';
import ScreenWrapper from '../components/ScreenWrapper';

const ChangePasswordScreen = ({ navigation }) => {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader title="Change Password" navigation={navigation} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <GlassCard style={styles.card}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Current Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter current password"
                  placeholderTextColor="rgba(255,255,255,0.45)"
                  secureTextEntry
                  value={current}
                  onChangeText={setCurrent}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>New Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor="rgba(255,255,255,0.45)"
                  secureTextEntry
                  value={newPass}
                  onChangeText={setNewPass}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Re-confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Re-enter new password"
                  placeholderTextColor="rgba(255,255,255,0.45)"
                  secureTextEntry
                  value={confirm}
                  onChangeText={setConfirm}
                />
              </View>
              <SettingsButton
                title="Continue"
                onPress={() => {}}
                style={{ marginTop: 28 }}
                disabled={!current || !newPass || !confirm}
              />
            </GlassCard>
          </ScrollView>
        </KeyboardAvoidingView>
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
    marginTop: 32,
    paddingVertical: 28,
    paddingHorizontal: 0,
  },
  inputGroup: {
    marginBottom: 22,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.32)',
    color: '#fff',
    fontSize: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 0,
  },
});

export default ChangePasswordScreen; 