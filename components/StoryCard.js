import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import GlassCard from './GlassCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const StoryCard = ({ 
  title = "Station 01", 
  image, 
  onPress,
  style,
  backgroundColor = 'rgba(255, 255, 255, 0.1)' // Default background for variety
}) => {
  // Calculate card width for 2-column layout with proper spacing
  const horizontalPadding = 20; // HomeScreen horizontal padding
  const cardGap = 12; // Gap between cards
  const cardWidth = (SCREEN_WIDTH - (horizontalPadding * 2) - cardGap) / 2;

  return (
    <TouchableOpacity
      style={[{ width: cardWidth }, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <GlassCard
        style={[
          styles.card,
          {
            backgroundColor: backgroundColor,
            borderRadius: 5.5, // Pixel perfect border radius
            borderColor: 'rgba(255, 255, 255, 0.16)', // FFFFFF 16% stroke
            borderWidth: 1, // Weight 1
          }
        ]}
        contentStyle={styles.cardContent}
        intensity={45.4}
      >
        {/* Image/Thumbnail */}
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>
        
        {/* Title */}
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 56, // Match the height from the screenshot
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#BDBDBD', // Gray placeholder color from screenshot
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});

export default StoryCard;