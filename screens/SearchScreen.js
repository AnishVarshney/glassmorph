import { useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ScreenWrapper from "../components/ScreenWrapper"
import GlassCard from "../components/GlassCard"
import BackButton from "../components/BackButton"

const { width, height } = Dimensions.get("window")

// Design constants for pixel-perfect layout
const HEADER_HEIGHT = 60
const SEARCH_BAR_HEIGHT = 56
const CARD_SPACING = 12
const SIDE_PADDING = 16
const CARD_WIDTH = (width - SIDE_PADDING * 2 - CARD_SPACING) / 2
const CARD_HEIGHT = 140

// Mock search categories/results
const searchCategories = [
  { id: 1, title: "Recently Played", color: "#1DB954" },
  { id: 2, title: "Made For You", color: "#E22134" },
  { id: 3, title: "Charts", color: "#FF6B35" },
  { id: 4, title: "New Releases", color: "#8E44AD" },
  { id: 5, title: "Discover", color: "#3498DB" },
  { id: 6, title: "Concerts", color: "#F39C12" },
]

const SearchScreen = () => {
  const insets = useSafeAreaInsets()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchInputRef = useRef(null)

  const handleSearchClear = () => {
    setSearchQuery("")
    searchInputRef.current?.focus()
  }

  const handleSearchSubmit = () => {
    Keyboard.dismiss()
    // Implement search logic here
    console.log("Searching for:", searchQuery)
  }

  const handleCategoryPress = (category) => {
    console.log("Category pressed:", category.title)
    // Navigate to category results
  }

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
        <View style={[styles.headerSection, { height: HEADER_HEIGHT }]}>
          <View style={styles.headerRow}>
            <BackButton size={40} containerStyle={styles.backButtonContainer} />

            <View style={styles.headerCenter}>
              <Text style={styles.screenTitle}>Search</Text>
            </View>

            <View style={styles.headerRight} />
          </View>
        </View>

        {/* Search Bar Section */}
        <View style={styles.searchSection}>
          <GlassCard
            style={[
              styles.searchBarContainer,
              {
                height: SEARCH_BAR_HEIGHT,
                borderRadius: SEARCH_BAR_HEIGHT / 2,
              },
            ]}
            contentStyle={styles.searchBarContent}
          >
            <Ionicons name="search" size={24} color="rgba(255,255,255,0.6)" style={styles.searchIcon} />

            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Artists, songs, or podcasts"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
              selectionColor="rgba(255,255,255,0.8)"
            />

            {searchQuery.length > 0 && (
              <TouchableOpacity style={styles.clearButton} onPress={handleSearchClear} activeOpacity={0.7}>
                <Ionicons name="close-circle" size={20} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
            )}
          </GlassCard>
        </View>

        {/* Content Section */}
        <ScrollView
          style={styles.contentSection}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {searchQuery.length === 0 ? (
            // Browse Categories
            <>
              <Text style={styles.sectionTitle}>Browse all</Text>
              <View style={styles.categoriesGrid}>
                {searchCategories.map((category, index) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryCard,
                      {
                        width: CARD_WIDTH,
                        height: CARD_HEIGHT,
                        marginRight: index % 2 === 0 ? CARD_SPACING : 0,
                        marginBottom: CARD_SPACING,
                      },
                    ]}
                    onPress={() => handleCategoryPress(category)}
                    activeOpacity={0.8}
                  >
                    <GlassCard
                      style={[
                        styles.categoryCardInner,
                        {
                          width: CARD_WIDTH,
                          height: CARD_HEIGHT,
                        },
                      ]}
                      contentStyle={styles.categoryCardContent}
                    >
                      <Text style={styles.categoryTitle}>{category.title}</Text>
                      <View style={[styles.categoryAccent, { backgroundColor: category.color }]} />
                    </GlassCard>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            // Search Results
            <View style={styles.searchResults}>
              <Text style={styles.sectionTitle}>Results for "{searchQuery}"</Text>
              {/* Add search results here */}
              <View style={styles.noResults}>
                <Ionicons name="search" size={48} color="rgba(255,255,255,0.3)" />
                <Text style={styles.noResultsText}>No results found</Text>
                <Text style={styles.noResultsSubtext}>Try searching for something else</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: SIDE_PADDING,
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
  },
  backButtonContainer: {
    width: 40,
    alignItems: "flex-start",
  },
  headerCenter: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 16,
  },
  headerRight: {
    width: 40,
  },
  screenTitle: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  searchSection: {
    paddingHorizontal: SIDE_PADDING,
    paddingVertical: 20,
  },
  searchBarContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchBarContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    fontWeight: "400",
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  contentSection: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: SIDE_PADDING,
    paddingBottom: 120, // Account for tab bar and player bar
  },
  sectionTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryCardInner: {
    borderRadius: 12,
  },
  categoryCardContent: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  categoryTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  categoryAccent: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.3,
    transform: [{ translateX: 20 }, { translateY: 20 }],
  },
  searchResults: {
    flex: 1,
  },
  noResults: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "400",
  },
})

export default SearchScreen
