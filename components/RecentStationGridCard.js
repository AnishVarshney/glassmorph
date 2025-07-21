import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import GlassCard from './GlassCard';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_RADIUS = 16;
const BOTTOM_ROW_HEIGHT = 48;
const CARD_SIZE = (width - CARD_MARGIN * 3 - 32) / 2; // 2 columns, 8px margin, 16px padding on each side

const RecentStationGridCard = ({ id, title, image, onFavorite, onOpenMenu }) => {
  const ellipsisRef = React.useRef();
  const handleEllipsisPress = () => {
    if (onOpenMenu) {
      ellipsisRef.current?.measureInWindow((x, y, width, height) => {
        onOpenMenu({ id, title, x, y, width, height });
      });
    }
  };
  return (
    <GlassCard style={styles.card} intensity={45.4} contentStyle={styles.cardContent}>
      <View style={styles.imageWrapper}>
        {image ? (
          <Image source={image} style={styles.img} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={onFavorite} style={styles.iconButton}>
            <Ionicons name="heart-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            ref={ellipsisRef}
            onPress={handleEllipsisPress}
            style={[styles.iconButton, { marginLeft: 10 }]}
            activeOpacity={0.7}
          >
            <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    margin: CARD_MARGIN,
    padding: 0,
    backgroundColor: 'transparent',
  },
  cardContent: {
    flex: 1,
    padding: 0,
  },
  imageWrapper: {
    flex: 1,
    borderTopLeftRadius: CARD_RADIUS,
    borderTopRightRadius: CARD_RADIUS,
    overflow: 'hidden',
    backgroundColor: '#BDBDBD',
  },
  img: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: CARD_RADIUS,
    borderTopRightRadius: CARD_RADIUS,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#BDBDBD',
    borderTopLeftRadius: CARD_RADIUS,
    borderTopRightRadius: CARD_RADIUS,
  },
  bottomRow: {
    height: BOTTOM_ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30,30,30,0.32)',
    paddingHorizontal: 12,
    borderBottomLeftRadius: CARD_RADIUS,
    borderBottomRightRadius: CARD_RADIUS,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
});

export default RecentStationGridCard; 