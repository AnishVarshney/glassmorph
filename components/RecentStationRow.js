import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import GlassCard from './GlassCard';
import { Ionicons } from '@expo/vector-icons';
import OptionsToggle from './OptionsToggle';

const STATION_OPTIONS = [
  { icon: { type: 'Ionicons', name: 'play-circle-outline', size: 24, color: '#fff' }, label: 'Play Station' },
  { icon: { type: 'Ionicons', name: 'heart-outline', size: 24, color: '#fff' }, label: 'Add to Favourites' },
  { icon: { type: 'Ionicons', name: 'share-social-outline', size: 22, color: '#fff' }, label: 'Share Station' },
  { icon: { type: 'Ionicons', name: 'trash-outline', size: 22, color: '#fff' }, label: 'Remove from Recents' },
];

const RecentStationRow = ({ 
  title, 
  image, 
  onFavorite, 
  onMore,
  onOptionSelect 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOptionSelect = (option) => {
    if (onOptionSelect) {
      onOptionSelect(option, title);
    }
    console.log(`Selected "${option.label}" for ${title}`);
  };

  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite(title);
    }
  };

  return (
    <GlassCard
      style={styles.card}
      contentStyle={styles.inner}
      intensity={45.4}
    >
      <View style={styles.thumb}>
        {image ? (
          <Image source={image} style={styles.img} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={handleFavorite} style={styles.iconButton}>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
        
        {/* Options Toggle integrated into the row */}
        <View style={styles.optionsContainer}>
          <OptionsToggle
            options={STATION_OPTIONS}
            isAbsolute={false}
            menuWidth={200}
            buttonSize={24}
            isOpen={isMenuOpen}
            onToggle={setIsMenuOpen}
            onOptionSelect={handleOptionSelect}
            renderCustomButton={(onPress, isOpen) => (
              <TouchableOpacity 
                onPress={onPress} 
                style={[styles.iconButton, { marginLeft: 12 }]}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name="ellipsis-vertical" 
                  size={24} 
                  color="#fff" 
                  style={{ opacity: isOpen ? 1 : 0.8 }}
                />
              </TouchableOpacity>
            )}
            containerStyle={styles.optionsToggleContainer}
          />
        </View>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 56,
    borderRadius: 16,
    marginVertical: 7,
    marginHorizontal: 8,
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: 'center',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
    height: '100%',
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 12,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#BDBDBD',
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  optionsContainer: {
    position: 'relative',
  },
  optionsToggleContainer: {
    alignItems: 'flex-end',
  },
});

export default RecentStationRow;