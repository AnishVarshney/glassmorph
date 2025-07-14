import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Carousel = ({ data, onItemPress, style }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width * 0.8,
      index * width * 0.8,
      (index + 1) * width * 0.8,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.carouselItem,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.carouselCard}
          onPress={() => onItemPress && onItemPress(item, index)}
          activeOpacity={0.9}
        >
          <Image source={{ uri: item.image }} style={styles.carouselImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.carouselGradient}
          >
            <View style={styles.carouselGlass}>
              <Text style={styles.carouselTitle}>{item.title}</Text>
              <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
              <View style={styles.carouselMeta}>
                <Ionicons name="play-circle" size={20} color="#fff" />
                <Text style={styles.carouselMetaText}>Play Now</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: index === activeIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                width: index === activeIndex ? 20 : 8,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width * 0.8 + 15}
        decelerationRate="fast"
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={styles.scrollContent}
      >
        {data.map((item, index) => renderItem({ item, index }))}
      </ScrollView>
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  carouselItem: {
    width: width * 0.8,
    marginRight: 15,
  },
  carouselCard: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  carouselGlass: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  carouselSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 15,
  },
  carouselMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carouselMetaText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default Carousel; 