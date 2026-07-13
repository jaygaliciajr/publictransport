import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { QuickActionButton } from "./quick-action-button";
import { QuickActionSheet } from "./quick-action-sheet";

const navItems = [
  { label: "Home", href: "/home", icon: "home" },
  { label: "Ride", href: "/ride", icon: "navigation" },
  { label: "Routes", href: "/routes", icon: "map" },
  { label: "Wallet", href: "/points", icon: "credit-card" },
] as const;

type NavItem = (typeof navItems)[number];

export function PassengerBottomNav() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);

  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  function isActive(item: NavItem) {
    if (item.href === "/home") {
      return pathname === "/home";
    }

    return pathname.startsWith(item.href);
  }

  return (
    <>
      <View
        style={{
          paddingHorizontal: 14,
          paddingBottom: Math.max(insets.bottom, 10),
          zIndex: 9999,
          elevation: 50,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 520,
            minHeight: 74,
            borderRadius: 37,
            borderCurve: "continuous",
            backgroundColor: "rgba(255,255,255,0.97)",
            borderWidth: 1,
            borderColor: colors.line,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            boxShadow: "0 18px 42px rgba(16, 24, 40, 0.17)",
          }}
        >
          {leftItems.map((item) => (
            <NavButton key={item.href} item={item} active={isActive(item)} />
          ))}
          <View style={{ width: 72 }} />
          {rightItems.map((item) => (
            <NavButton key={item.href} item={item} active={isActive(item)} />
          ))}
        </View>
        <View style={{ position: "absolute", left: 0, right: 0, top: -21, alignItems: "center" }}>
          <QuickActionButton open={quickActionsOpen} onPress={() => setQuickActionsOpen((open) => !open)} />
        </View>
      </View>
      <QuickActionSheet visible={quickActionsOpen} onClose={() => setQuickActionsOpen(false)} />
    </>
  );
}

function NavButton({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityLabel={item.label}
      accessibilityState={{ selected: active }}
      onPress={() => router.push(item.href)}
      style={{ flex: 1 }}
    >
      {({ pressed }) => (
        <View
          style={{
            minHeight: 58,
            borderRadius: 26,
            borderCurve: "continuous",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            opacity: pressed ? 0.68 : 1,
          }}
        >
          {active ? (
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 36,
                height: 32,
                borderRadius: 16,
                borderCurve: "continuous",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name={item.icon} size={17} color={colors.surface} />
            </LinearGradient>
          ) : (
            <View
              style={{
                width: 36,
                height: 32,
                borderRadius: 16,
                borderCurve: "continuous",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name={item.icon} size={18} color={colors.muted} />
            </View>
          )}
          <Text
            numberOfLines={1}
            style={[
              typography.small,
              {
                color: active ? colors.dark : colors.muted,
                fontSize: 11,
                lineHeight: 14,
                fontWeight: active ? "800" : "700",
              },
            ]}
          >
            {item.label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
