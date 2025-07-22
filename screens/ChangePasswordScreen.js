"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"

import ScreenHeader from "../components/ScreenHeader"
import GlassCard from "../components/GlassCard"
import SettingsButton from "../components/SettingsButton"
import ScreenWrapper from "../components/ScreenWrapper"

const ChangePasswordScreen = () => {
  const navigation = useNavigation()
  const [current, setCurrent] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirm, setConfirm] = useState("")

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <ScreenHeader title="Change Password" titleAlign="left" showBackButton={true} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GlassCard style={styles.card} contentStyle={styles.cardContent}>
          <View style={styles.inputSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter current password"
                placeholderTextColor="rgba(255,255,255,0.5)"
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
                placeholderTextColor="rgba(255,255,255,0.5)"
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
                placeholderTextColor="rgba(255,255,255,0.5)"
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />
            </View>
          </View>

          <View style={styles.buttonSection}>
            <SettingsButton title="Continue" onPress={() => {}} disabled={!current || !newPass || !confirm} />
          </View>
        </GlassCard>
      </ScrollView>
    </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 24,
    flexGrow: 1,
  },
  card: {
    borderRadius: 16,
  },
  cardContent: {
    padding: 24,
  },
  inputSection: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 17,
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontWeight: "400",
  },
  buttonSection: {
    paddingTop: 8,
  },
})

export default ChangePasswordScreen
