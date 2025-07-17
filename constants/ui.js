import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
 
export const BAR_WIDTH = Math.max(220, Math.min(width * 0.74, 300)); // 74% of screen, min 220, max 300
export const BAR_HEIGHT = Math.max(56, Math.min(width * 0.17, 70));
export const BAR_RADIUS = BAR_HEIGHT / 2; 
export const TAB_SEARCH_MARGIN = 18; // matches CustomTabBar styles.pill marginRight 