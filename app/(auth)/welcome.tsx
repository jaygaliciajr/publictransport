import { GradientCard } from "@/components/cards/gradient-card";
import { AppShell } from "@/components/navigation/app-shell";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <AppShell style={{ flexGrow: 1 }}>
      <View style={{ flex: 1, justifyContent: "space-between", gap: 28 }}>
        <View style={{ gap: 20 }}>
          <GradientCard style={{ minHeight: 290, justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={[typography.h2, { color: colors.surface }]}>PUTI</Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Feather name="wifi" size={20} color={colors.surface} />
                <Feather name="shield" size={20} color={colors.surface} />
                <Feather name="battery-charging" size={20} color={colors.surface} />
              </View>
            </View>
            <View style={{ gap: 12 }}>
              <Text style={[typography.title, { color: colors.surface }]}>Public utility transport, made cleaner.</Text>
              <Text style={[typography.body, { color: "rgba(255,255,255,0.88)" }]}>
                Discover electric minibus routes, check in with QR, and pay using ride points.
              </Text>
            </View>
          </GradientCard>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <MiniValue icon="map-pin" label="Live routes" />
            <MiniValue icon="credit-card" label="Cashless" />
            <MiniValue icon="feather" label="CO2 saved" />
          </View>
        </View>
        <View style={{ gap: 12 }}>
          <PrimaryButton label="Create account" onPress={() => router.push("/register")} />
          <SecondaryButton label="Log in" onPress={() => router.push("/login")} />
          <SecondaryButton label="View routes without logging in" onPress={() => router.push("/route-preview")} />
        </View>
      </View>
    </AppShell>
  );
}

function MiniValue({ icon, label }: { icon: keyof typeof Feather.glyphMap; label: string }) {
  return (
    <View
      style={{
        flex: 1,
        minHeight: 92,
        borderRadius: 22,
        borderCurve: "continuous",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Feather name={icon} size={22} color={colors.primary} />
      <Text style={[typography.small, { color: colors.dark, textAlign: "center" }]}>{label}</Text>
    </View>
  );
}
