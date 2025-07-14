import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

const CategoryCarousel = ({
  categories = [],
  selected,
  onSelect,
  style,
}) => {
  const scrollRef = useRef();

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces
      >
        {categories.map((cat, idx) => {
          const isActive = selected === idx || selected === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
              activeOpacity={0.8}
              onPress={() => onSelect && onSelect(idx, cat)}
            >
              <Text style={[styles.chipText, isActive ? styles.chipTextActive : styles.chipTextInactive]}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const CHIP_HEIGHT = 38;
const CHIP_RADIUS = 19;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 8,
    marginBottom: 18,
  },
  scrollContent: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  chip: {
    height: CHIP_HEIGHT,
    borderRadius: CHIP_RADIUS,
    paddingHorizontal: 22,
    marginRight: 12,
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    minWidth: 60,
  },
  chipActive: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderColor: 'rgba(255,255,255,0.32)',
  },
  chipInactive: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderColor: 'rgba(255,255,255,0.18)',
  },
  chipText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  chipTextActive: {
    color: '#fff',
    opacity: 1,
  },
  chipTextInactive: {
    color: '#fff',
    opacity: 0.8,
  },
});

export default CategoryCarousel; 