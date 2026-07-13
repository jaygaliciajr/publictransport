import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockUser } from "@/data/mockUser";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { clearReturningUser } from "@/lib/authStorage";
import { Link, router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { GlassCard } from "../cards/glass-card";

const menuItems = [
  { label: "Profile Details", href: "/profile", icon: "user" },
  { label: "Points Wallet", href: "/points", icon: "credit-card" },
  { label: "Ride History", href: "/history", icon: "clock" },
  { label: "Loyalty", href: "/loyalty", icon: "award" },
  { label: "Routes", href: "/routes", icon: "map" },
  { label: "Inbox", href: "/inbox", icon: "inbox" },
  { label: "App Settings", href: "/settings", icon: "settings" },
  { label: "Security", href: "/security", icon: "shield" },
  { label: "Help & Support", href: "/help", icon: "help-circle" },
  { label: "Terms & Privacy", href: "/terms", icon: "file-text" },
];

export function SideMenu() {
  async function handleLogout() {
    await clearReturningUser();
    router.replace("/welcome");
  }

  return (
    <View style={{ gap: 14 }}>
      <GlassCard style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Image source={{ uri: mockUser.avatarUrl }} style={{ width: 56, height: 56, borderRadius: 28 }} />
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{mockUser.fullName}</Text>
          <Text style={[typography.small, { color: colors.muted }]}>{mockUser.passengerId}</Text>
        </View>
      </GlassCard>
      {menuItems.map((item) => (
        <Link key={item.label} href={item.href as never} asChild>
          <Pressable accessibilityRole="button" accessibilityLabel={item.label}>
            {({ pressed }) => (
              <GlassCard style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 16, opacity: pressed ? 0.7 : 1 }}>
                <Feather name={item.icon as keyof typeof Feather.glyphMap} size={20} color={colors.primary} />
                <Text style={[typography.body, { color: colors.dark, flex: 1 }]}>{item.label}</Text>
                <Feather name="chevron-right" size={18} color={colors.muted} />
              </GlassCard>
            )}
          </Pressable>
        </Link>
      ))}
      <Pressable accessibilityRole="button" accessibilityLabel="Logout" onPress={handleLogout}>
        {({ pressed }) => (
          <GlassCard style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 16, opacity: pressed ? 0.7 : 1 }}>
            <Feather name="log-out" size={20} color={colors.error} />
            <Text style={[typography.body, { color: colors.error, flex: 1 }]}>Logout</Text>
          </GlassCard>
        )}
      </Pressable>
    </View>
  );
}
