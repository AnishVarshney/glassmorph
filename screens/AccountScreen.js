import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ScreenWrapper from "../components/ScreenWrapper"
import ScreenHeader from "../components/ScreenHeader"
import GlassCard from "../components/GlassCard"
import SettingsOptionRow from "../components/SettingsOptionRow"
import { useNavigation } from "@react-navigation/native"

const OPTIONS = [
  { label: "Email", icon: "mail-outline", iconType: "Ionicons", screen: null },
  { label: "Subscription", icon: "card-outline", iconType: "Ionicons", screen: null },
  { label: "Personalization", icon: "color-palette-outline", iconType: "Ionicons", screen: null },
  { label: "Change Password", icon: "key-outline", iconType: "Ionicons", screen: "ChangePassword", showArrow: true },
]

const AccountScreen = () => {
  const navigation = useNavigation()

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader title="Accounts" titleAlign="left" showBackButton={true} />
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Pro Section */}
          <GlassCard style={styles.proCard} contentStyle={styles.proCardContent}>
            <View style={styles.proContent}>
              <View style={styles.proTextSection}>
                <Text style={styles.proTitle}>Want more features?</Text>
                <Text style={styles.proSubtitle}>Upgrade to unlock</Text>
                <TouchableOpacity style={styles.proButton} activeOpacity={0.8}>
                  <Text style={styles.proButtonText}>Get Pro</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.proIconSection}>
                <Ionicons name="flash" size={44} color="#FF3B30" />
              </View>
            </View>
          </GlassCard>

          {/* Main Options */}
          <GlassCard style={styles.card} contentStyle={styles.cardContent}>
            {OPTIONS.map((opt, idx) => (
              <SettingsOptionRow
                key={opt.label}
                icon={opt.icon}
                iconType={opt.iconType}
                label={opt.label}
                showArrow={opt.showArrow}
                onPress={opt.screen ? () => navigation.navigate(opt.screen) : undefined}
                style={[styles.optionRow, idx === OPTIONS.length - 1 ? styles.lastOptionRow : styles.regularOptionRow]}
              />
            ))}

            <View style={styles.deleteSection}>
              <Text style={styles.deleteText}>Delete account</Text>
            </View>
          </GlassCard>
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 24,
    flexGrow: 1,
  },
  proCard: {
    marginBottom: 16,
    borderRadius: 16,
  },
  proCardContent: {
    padding: 20,
  },
  proContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  proTextSection: {
    flex: 1,
  },
  proTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  proSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginBottom: 16,
    fontWeight: "400",
  },
  proButton: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  proButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  proIconSection: {
    marginLeft: 20,
  },
  card: {
    borderRadius: 16,
  },
  cardContent: {
    paddingVertical: 0,
  },
  optionRow: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  regularOptionRow: {
    // Keep border
  },
  lastOptionRow: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  deleteSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  deleteText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "400",
    letterSpacing: -0.2,
  },
})

export default AccountScreen
