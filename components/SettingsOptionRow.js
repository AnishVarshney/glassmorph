"use client"

import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const SettingsOptionRow = ({
  icon,
  iconType = "Ionicons",
  label,
  showArrow = false,
  onPress,
  style,
  disabled = false,
}) => {
  const IconComponent = Ionicons

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <IconComponent name={icon} size={24} color="rgba(255,255,255,0.8)" />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>

      {showArrow && (
        <View style={styles.rightSection}>
          <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.5)" />
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: 56,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 32,
    alignItems: "center",
    marginRight: 16,
  },
  label: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "400",
    letterSpacing: -0.2,
    flex: 1,
  },
  rightSection: {
    marginLeft: 16,
  },
})

export default SettingsOptionRow
