# 🎵 Jukebox - Modern Radio App

A beautiful, modern jukebox app built with React Native and Expo, featuring glassmorphism effects, smooth carousels, and an intuitive user interface inspired by Spotify and Apple Music.

## ✨ Features

### 🎨 Design Features
- **Glassmorphism Effects**: Beautiful frosted glass UI elements throughout the app
- **Smooth Carousel**: Animated carousel with scale and opacity transitions
- **Modern UI**: Dark theme with gradient overlays and blur effects
- **Responsive Design**: Optimized for both iOS and Android devices

### 🎵 Music Features
- **Live Radio Stations**: Browse and play various radio stations
- **Featured Content**: Curated playlists and trending music
- **Quick Actions**: Fast access to search, favorites, and downloads
- **Now Playing Bar**: Persistent player with play/pause controls
- **Recently Played**: Quick access to your listening history

### 🚀 Technical Features
- **Smooth Animations**: React Native Animated API for fluid transitions
- **Blur Effects**: Expo Blur for authentic glassmorphism
- **Gradient Overlays**: Linear gradients for depth and visual appeal
- **Optimized Performance**: Efficient rendering and memory management

## 🎯 Design Goals Achieved

✅ **Glass Effect (Apple Glassmorphism)**
- BlurView components with varying intensities
- Semi-transparent backgrounds
- Subtle shadows and borders

✅ **Carousel Implementation**
- Smooth horizontal scrolling
- Scale and opacity animations
- Pagination indicators
- Snap-to-item behavior

✅ **Latest Design Trends**
- Dark mode interface
- Rounded corners and modern typography
- Minimalist iconography
- Consistent spacing and hierarchy

## 📱 Screenshots

The app features:
- **Header**: Personalized greeting with profile access
- **Hero Carousel**: Featured content with smooth animations
- **Quick Actions**: Search, Favorites, and Downloads
- **Radio Stations**: Grid layout with glassmorphism cards
- **Recently Played**: Horizontal scrolling list
- **Now Playing Bar**: Persistent player controls
- **Bottom Navigation**: Home, Search, Library, Settings

## 🛠️ Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **React Native Linear Gradient**: Gradient overlays
- **Expo Blur**: Glassmorphism effects
- **React Native Animated**: Smooth animations
- **Expo Vector Icons**: Beautiful iconography

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jkd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

### If Android auto-open fails (Expo Go / emulator)

Some Android emulator images have a `monkey` tool that exits with code `251` (“SYS_KEYS has no physical keys”), which prevents Expo’s auto-open from working.

With Metro already running (`npm start`), you can open Expo Go manually via:

```bash
npm run open:android
```

### If the emulator can’t reach Metro (common on Android)

Use localhost mode (best for Android emulator):

```bash
npm run start:emulator
```

Then open the project URL directly in Expo Go:

```bash
npm run open:android:url
```

## 📁 Project Structure

```
jkd/
├── App.js                 # Main application component
├── components/
│   └── Carousel.js       # Reusable carousel component
├── assets/               # Images and static assets
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## 🎨 Design System

### Colors
- **Primary Background**: `#0A0A0A` (Deep Black)
- **Glass Elements**: `rgba(255,255,255,0.1)` (Semi-transparent white)
- **Text**: `#FFFFFF` (White)
- **Accent Colors**: Various gradient colors for station cards

### Typography
- **Headings**: Bold, 22-24px
- **Body Text**: Regular, 14-16px
- **Captions**: Light, 10-12px

### Spacing
- **Section Padding**: 20px
- **Card Margins**: 15px
- **Element Spacing**: 8-15px

## 🔧 Customization

### Adding New Radio Stations
Edit the `radioStations` array in `App.js`:
```javascript
const radioStations = [
  {
    id: 6,
    name: 'New Station',
    genre: 'Genre',
    listeners: '1.2K',
    image: 'station-image-url',
    color: '#HEXCODE',
  },
  // ... more stations
];
```

### Modifying Carousel Data
Update the `carouselData` array in `App.js`:
```javascript
const carouselData = [
  {
    id: 5,
    title: 'New Feature',
    subtitle: 'Description',
    image: 'feature-image-url',
  },
  // ... more items
];
```

## 🚀 Future Enhancements

- [ ] Audio playback integration
- [ ] User authentication
- [ ] Offline mode
- [ ] Push notifications
- [ ] Social features (sharing, following)
- [ ] Advanced search and filtering
- [ ] Custom playlists
- [ ] Equalizer and audio effects

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React Native and Expo** 