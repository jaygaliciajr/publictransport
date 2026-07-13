import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Action = {
  label: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  href: string;
};

const actions: Action[] = [
  { label: "Scan QR", description: "Board and validate payment", icon: "grid", href: "/qr" },
  { label: "Reserve", description: "Book a seat ahead", icon: "calendar", href: "/reservations" },
  { label: "Wallet", description: "Send or acquire points", icon: "credit-card", href: "/points" },
  { label: "Menu", description: "Profile, security, and support", icon: "menu", href: "/menu" },
  { label: "Help", description: "Support and safety", icon: "help-circle", href: "/help" },
];

export function QuickActionSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets();

  function openAction(href: string) {
    onClose();
    requestAnimationFrame(() => router.push(href as never));
  }

  if (!visible) {
    return null;
  }

  return (
    <View
      style={{
        position: Platform.OS === "web" ? ("fixed" as "absolute") : "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 10000,
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close quick actions"
        onPress={onClose}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(16, 24, 40, 0.28)",
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: Math.max(insets.bottom + 86, 96),
          alignItems: "center",
          paddingHorizontal: 14,
        }}
      >
        <View
          accessibilityRole="menu"
          style={{
            width: "100%",
            maxWidth: 520,
            borderRadius: 34,
            borderCurve: "continuous",
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.line,
            padding: 18,
            paddingBottom: 22,
            gap: 16,
            boxShadow: "0 22px 48px rgba(16, 24, 40, 0.2)",
          }}
        >
          <View style={{ alignSelf: "center", width: 44, height: 5, borderRadius: 999, backgroundColor: colors.lineStrong }} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={{
                width: 48,
                height: 48,
                borderRadius: 18,
                borderCurve: "continuous",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="zap" size={22} color={colors.surface} />
            </LinearGradient>
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={[typography.h2, { color: colors.dark }]}>Quick actions</Text>
              <Text style={[typography.small, { color: colors.muted }]}>Fast access to the things you use most.</Text>
            </View>
          </View>

          <View style={{ gap: 10 }}>
            {actions.map((action) => (
              <Pressable key={action.label} accessibilityRole="menuitem" accessibilityLabel={action.label} onPress={() => openAction(action.href)}>
                {({ pressed }) => (
                  <View
                    style={{
                      minHeight: 64,
                      borderRadius: 22,
                      borderCurve: "continuous",
                      backgroundColor: pressed ? colors.faint : colors.surfaceElevated,
                      borderWidth: 1,
                      borderColor: pressed ? colors.primary : colors.line,
                      padding: 13,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 15,
                        borderCurve: "continuous",
                        backgroundColor: colors.faint,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Feather name={action.icon} size={18} color={colors.primary} />
                    </View>
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{action.label}</Text>
                      <Text style={[typography.small, { color: colors.muted }]}>{action.description}</Text>
                    </View>
                    <Feather name="chevron-right" size={18} color={colors.softMuted} />
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
