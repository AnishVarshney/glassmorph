import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const ICON_MAP = {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
};

const SettingsOptionRow = ({
  icon,
  iconType = 'Ionicons',
  label,
  onPress,
  showArrow = false,
  style,
}) => {
  const IconComponent = ICON_MAP[iconType] || Ionicons;
  return (
    <TouchableOpacity
      style={[styles.row, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrap}>
        <IconComponent name={icon} size={22} color="#fff" />
      </View>
      <Text style={styles.label}>{label}</Text>
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color="#fff" style={styles.arrow} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    marginBottom: 2,
  },
  iconWrap: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  arrow: {
    marginLeft: 8,
    opacity: 0.7,
  },
});

export default SettingsOptionRow; 