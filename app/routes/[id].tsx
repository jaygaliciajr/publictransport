import { BusStatusCard } from "@/components/routes/bus-status-card";
import { StopTimeline } from "@/components/routes/stop-timeline";
import { BottomSheet } from "@/components/ride/bottom-sheet";
import { FeaturePill } from "@/components/ride/feature-pill";
import { TransportStatusBadge } from "@/components/ride/transport-status-badge";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { ErrorState } from "@/components/ui/state-views";
import { colors, gradients } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockBuses } from "@/data/mockBuses";
import { mockRoutes } from "@/data/mockRoutes";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RouteDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const route = mockRoutes.find((item) => item.id === id);
  const buses = mockBuses.filter((bus) => bus.routeId === id);

  if (!route) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 18, paddingBottom: 118, gap: 18 }}>
          <ScreenHeader title="Route details" showBack />
          <ErrorState title="Route not found" body="This route may be offline or unavailable." />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 12, paddingBottom: 118, gap: 18 }}
      >
        <ScreenHeader title={route.name} subtitle={`${route.origin} to ${route.destination}`} showBack />

        <LinearGradient
          colors={gradients.map}
          style={{
            height: 240,
            borderRadius: 32,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: colors.line,
            padding: 18,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <MapPin icon="map-pin" label={route.origin} />
            <TransportStatusBadge status={route.status} />
          </View>
          <View style={{ gap: 12 }}>
            <View style={{ height: 8, borderRadius: 999, backgroundColor: "rgba(16, 24, 40, 0.09)", overflow: "hidden" }}>
              <View style={{ width: "68%", height: 8, borderRadius: 999, backgroundColor: colors.primary }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <MapPin icon="truck" label={`${route.activeBuses} buses`} />
              <MapPin icon="flag" label={route.destination} />
            </View>
          </View>
        </LinearGradient>

        <BottomSheet>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={[typography.h2, { color: colors.dark }]}>Route summary</Text>
              <Text style={[typography.small, { color: colors.muted }]}>Fare, ETA, stops, and active vehicle availability.</Text>
            </View>
            <Text style={[typography.h2, { color: colors.primary }]}>{route.farePoints} pts</Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9 }}>
            <FeaturePill icon="clock" label={route.estimatedTime} />
            <FeaturePill icon="zap" label={`Next ${route.nextBusEta}`} tone="blue" />
            <FeaturePill icon="navigation" label={`${route.activeBuses} active buses`} tone="success" />
            <FeaturePill icon="map-pin" label={`${route.stops.length} stops`} />
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <PrimaryButton label="Start Ride" icon="navigation" onPress={() => router.push("/ride")} style={{ flex: 1 }} />
            <SecondaryButton label="Reserve" icon="calendar" onPress={() => router.push("/reservations")} style={{ flex: 1 }} />
          </View>
        </BottomSheet>

        <View style={{ gap: 12 }}>
          <Text style={[typography.h2, { color: colors.dark }]}>Stops</Text>
          <View style={{ padding: 18, borderRadius: 26, borderCurve: "continuous", backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
            <StopTimeline stops={route.stops} />
          </View>
        </View>

        <View style={{ gap: 12 }}>
          <Text style={[typography.h2, { color: colors.dark }]}>Active buses</Text>
          {buses.map((bus) => <BusStatusCard key={bus.id} bus={bus} />)}
        </View>

        <View style={{ gap: 12 }}>
          <Text style={[typography.h2, { color: colors.dark }]}>Safety and comfort</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9 }}>
            <FeaturePill icon="wifi" label="Wi-Fi available" tone="blue" />
            <FeaturePill icon="video" label="CCTV onboard" tone="success" />
            <FeaturePill icon="battery-charging" label="Electric minibus" />
            <FeaturePill icon="shield" label="Driver verified" tone="success" />
            <FeaturePill icon="users" label="Capacity indicator" tone="neutral" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MapPin({ icon, label }: { icon: keyof typeof Feather.glyphMap; label: string }) {
  return (
    <View style={{ alignItems: "center", gap: 6, maxWidth: 136 }}>
      <View style={{ width: 42, height: 42, borderRadius: 16, borderCurve: "continuous", backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", boxShadow: "0 10px 20px rgba(16, 24, 40, 0.12)" }}>
        <Feather name={icon} size={18} color={colors.primary} />
      </View>
      <Text style={[typography.small, { color: colors.dark, textAlign: "center" }]} numberOfLines={2}>{label}</Text>
    </View>
  );
}
