import { GlassCard } from "@/components/cards/glass-card";
import { FeatureIconCard } from "@/components/ride/feature-icon-card";
import { LocationSearchInput } from "@/components/ride/location-search-input";
import { AppShell } from "@/components/navigation/app-shell";
import { PremiumTopArea } from "@/components/ride/premium-top-area";
import { RideOptionCard } from "@/components/ride/ride-option-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { colors, gradients } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockBuses } from "@/data/mockBuses";
import { mockRoutes } from "@/data/mockRoutes";
import { mockUser } from "@/data/mockUser";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

const highlights = [
  ["battery-charging", "Electric minibus"],
  ["navigation", "GPS tracking"],
  ["wifi", "Wi-Fi"],
  ["video", "CCTV"],
  ["credit-card", "Cashless payment"],
  ["zap", "Zero emission"],
] as const;

export default function DashboardScreen() {
  const [pickup, setPickup] = useState("Brgy. San Luis, GMA Cavite");
  const [destination, setDestination] = useState("");
  const nearbyRoute = mockRoutes[0];
  const nearbyBus = mockBuses[0];
  const recentPlaces = useMemo(() => ["DBB-C City Terminal", "La Salle Dasmarinas", "Festival Mall Alabang"], []);

  return (
    <AppShell keyboardShouldPersistTaps="handled" showBottomNav>
        <View style={{ backgroundColor: colors.background, paddingBottom: 2, zIndex: 10 }}>
          <PremiumTopArea
            user={mockUser}
            onProfilePress={() => router.push("/menu")}
            onWalletPress={() => router.push("/points")}
          />
        </View>

        <LinearGradient
          colors={gradients.premium}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 32,
            borderCurve: "continuous",
            padding: 18,
            gap: 16,
            overflow: "hidden",
            boxShadow: "0 20px 42px rgba(16, 24, 40, 0.16)",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={[typography.small, { color: "rgba(255,255,255,0.86)" }]}>Nearby minibus</Text>
              <Text style={[typography.h1, { color: colors.surface }]}>Arriving in {nearbyBus.etaMinutes} min</Text>
              <Text style={[typography.small, { color: "rgba(255,255,255,0.84)" }]}>{nearbyBus.plateNumber} near {nearbyBus.nextStop}</Text>
            </View>
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 26,
                borderCurve: "continuous",
                backgroundColor: "rgba(255,255,255,0.16)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="truck" size={34} color={colors.surface} />
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.16)" }} />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <PrimaryButton label="Ride now" icon="navigation" onPress={() => router.push("/ride")} style={{ flex: 1, paddingHorizontal: 12, boxShadow: "none" }} />
            <SecondaryButton
              label="View routes"
              icon="map"
              onPress={() => router.push("/routes")}
              style={{ flex: 1, paddingHorizontal: 12, backgroundColor: colors.surface, borderColor: "rgba(255,255,255,0.18)" }}
            />
          </View>
        </LinearGradient>

        <LocationSearchInput
          pickup={pickup}
          destination={destination}
          onChangePickup={setPickup}
          onChangeDestination={setDestination}
        />

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          <QuickAction icon="navigation" label="Ride now" onPress={() => router.push("/ride")} primary />
          <QuickAction icon="git-branch" label="Routes" onPress={() => router.push("/routes")} />
          <QuickAction icon="calendar" label="Reserve" onPress={() => router.push("/reservations")} />
          <QuickAction icon="grid" label="Scan QR" onPress={() => router.push("/qr")} />
        </View>

        <View style={{ gap: 12 }}>
          <SectionTitle title="Nearby ride" action="Track" onPress={() => router.push("/ride")} />
          <RideOptionCard route={nearbyRoute} bus={nearbyBus} selected />
        </View>

        <GlassCard style={{ gap: 14 }}>
          <SectionTitle title="Recent places" />
          <View style={{ gap: 10 }}>
            {recentPlaces.map((place) => (
              <Pressable key={place} accessibilityRole="button" onPress={() => setDestination(place)}>
                {({ pressed }) => (
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 11, opacity: pressed ? 0.68 : 1 }}>
                    <View style={{ width: 36, height: 36, borderRadius: 14, backgroundColor: colors.faint, alignItems: "center", justifyContent: "center" }}>
                      <Feather name="clock" size={16} color={colors.primary} />
                    </View>
                    <Text style={[typography.body, { color: colors.dark, flex: 1 }]}>{place}</Text>
                    <Feather name="arrow-up-right" size={17} color={colors.muted} />
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </GlassCard>

        <View style={{ gap: 12 }}>
          <SectionTitle title="Why ride PUTI" />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {highlights.map(([icon, label], index) => (
              <FeatureIconCard key={label} icon={icon} label={label} />
            ))}
          </View>
        </View>
    </AppShell>
  );
}

function QuickAction({
  icon,
  label,
  onPress,
  primary,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
  primary?: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={{ flexGrow: 1, flexBasis: "47%" }}>
      {({ pressed }) => (
        <View
          style={{
            minHeight: 86,
            minWidth: 0,
            padding: 11,
            borderRadius: 22,
            borderCurve: "continuous",
            backgroundColor: primary ? colors.faint : colors.surface,
            borderWidth: 1,
            borderColor: primary ? `${colors.primary}55` : colors.line,
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: pressed ? 0.72 : 1,
          }}
        >
          <Feather name={icon} size={21} color={primary ? colors.primary : colors.dark} />
          <Text style={[typography.small, { color: colors.dark, textAlign: "center" }]}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

function SectionTitle({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <Text style={[typography.h2, { color: colors.dark }]}>{title}</Text>
      {action ? (
        <Pressable accessibilityRole="button" onPress={onPress}>
          <Text style={[typography.small, { color: colors.primary }]}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
