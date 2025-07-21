import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import GlassCard from './GlassCard';
import { Ionicons } from '@expo/vector-icons';



const RecentStationRow = ({ 
  title, 
  image, 
  onFavorite, 
  onMore,
  onOptionSelect,
  onOpenMenu, // NEW PROP
  id // NEW PROP for identifying the row
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ellipsisRef = React.useRef();

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

  const handleEllipsisPress = () => {
    if (onOpenMenu) {
      ellipsisRef.current?.measureInWindow((x, y, width, height) => {
        onOpenMenu({ id, title, x, y, width, height });
      });
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
        {/* Ellipsis Button - triggers menu in parent */}
        <TouchableOpacity
          ref={ellipsisRef}
          onPress={handleEllipsisPress}
          style={[styles.iconButton, { marginLeft: 12 }]}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="ellipsis-vertical" 
            size={24} 
            color="#fff" 
            style={{ opacity: 1 }}
          />
        </TouchableOpacity>
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