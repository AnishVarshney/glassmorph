"use client"

import { View, Text, StyleSheet, Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import BackButton from "./BackButton"

const { width } = Dimensions.get("window")

const ScreenHeader = ({
  title,
  showBackButton = true,
  rightComponent = null,
  titleAlign = "center",
  style,
  containerStyle,
  titleStyle,
  backButtonProps = {},
}) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const canGoBack = navigation?.canGoBack?.()
  const shouldShowBackButton = showBackButton && canGoBack

  return (
    <View style={[styles.container, { paddingTop: insets.top }, containerStyle]}>
      <View style={[styles.headerContent, style]}>
        <View style={styles.headerRow}>
          {/* Left Section - Back Button */}
          <View style={styles.leftSection}>
            {shouldShowBackButton && (
              <BackButton size={40} containerStyle={styles.backButtonContainer} {...backButtonProps} />
            )}
          </View>

          {/* Center Section - Title */}
          <View style={[styles.centerSection, titleAlign === "left" && styles.centerSectionLeft]}>
            <Text style={[styles.title, titleAlign === "left" && styles.titleLeft, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          </View>

          {/* Right Section - Optional Component */}
          <View style={styles.rightSection}>{rightComponent}</View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
  },
  leftSection: {
    width: 56,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  centerSectionLeft: {
    alignItems: "flex-start",
    paddingHorizontal: 0,
    paddingLeft: 16,
  },
  rightSection: {
    width: 56,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  backButtonContainer: {
    alignItems: "flex-start",
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "700",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  titleLeft: {
    textAlign: "left",
  },
})

export default ScreenHeader
