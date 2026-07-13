import { BottomSheet } from "@/components/ride/bottom-sheet";
import { FeaturePill } from "@/components/ride/feature-pill";
import { LocationSearchInput } from "@/components/ride/location-search-input";
import { AppShell } from "@/components/navigation/app-shell";
import { RideOptionCard } from "@/components/ride/ride-option-card";
import { TransportStatusBadge } from "@/components/ride/transport-status-badge";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ErrorState, LoadingState, SuccessState } from "@/components/ui/state-views";
import { colors, gradients } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockBuses } from "@/data/mockBuses";
import { mockRoutes } from "@/data/mockRoutes";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

type RidePhase = "searching" | "ready" | "confirmed" | "arriving" | "inProgress";

export default function RideScreen() {
  const [pickup, setPickup] = useState("Brgy. San Luis, GMA Cavite");
  const [destination, setDestination] = useState("DBB-C City Terminal");
  const [selectedRouteId, setSelectedRouteId] = useState(mockRoutes[0]?.id);
  const [phase, setPhase] = useState<RidePhase>("ready");
  const selectedRoute = useMemo(() => mockRoutes.find((route) => route.id === selectedRouteId) ?? mockRoutes[0], [selectedRouteId]);
  const selectedBus = mockBuses.find((bus) => bus.routeId === selectedRoute.id) ?? mockBuses[0];
  const hasRideOptions = mockRoutes.length > 0 && destination.trim().length > 0;

  function confirmRide() {
    setPhase("confirmed");
  }

  return (
    <AppShell keyboardShouldPersistTaps="handled" showBottomNav>
        <View style={{ gap: 4 }}>
          <Text style={[typography.h1, { color: colors.dark }]}>Choose your ride</Text>
          <Text style={[typography.body, { color: colors.muted }]}>Pick a route, check fare, then confirm.</Text>
        </View>

        <MapPreview phase={phase} />

        <LocationSearchInput
          pickup={pickup}
          destination={destination}
          onChangePickup={setPickup}
          onChangeDestination={setDestination}
        />

        {phase === "searching" ? (
          <LoadingState title="Searching nearby rides" body="Checking active minibuses." />
        ) : null}

        {!hasRideOptions ? (
          <ErrorState title="No rides nearby" body="Try another pickup point." />
        ) : (
          <BottomSheet>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={[typography.h2, { color: colors.dark }]}>Suggested route</Text>
                <Text style={[typography.small, { color: colors.muted }]}>Best match for your pickup.</Text>
              </View>
              <TransportStatusBadge status={phase === "confirmed" ? "Confirmed" : phase === "inProgress" ? "In progress" : "Arriving"} />
            </View>

            <View style={{ gap: 10 }}>
              {mockRoutes.map((route) => (
                <RideOptionCard
                  key={route.id}
                  route={route}
                  bus={mockBuses.find((bus) => bus.routeId === route.id)}
                  selected={route.id === selectedRoute.id}
                  onPress={() => setSelectedRouteId(route.id)}
                />
              ))}
            </View>

            <FareEstimate fare={selectedRoute.farePoints} eta={selectedBus.etaMinutes} duration={selectedRoute.estimatedTime} />

            {phase === "confirmed" ? (
              <SuccessState title="Ride confirmed" body={`${selectedBus.plateNumber} arrives in ${selectedBus.etaMinutes} min.`} />
            ) : null}

            <View style={{ gap: 10 }}>
              <PrimaryButton
                label={phase === "confirmed" ? "Track your ride" : "Confirm ride"}
                icon={phase === "confirmed" ? "map-pin" : "check-circle"}
                onPress={phase === "confirmed" ? () => setPhase("inProgress") : confirmRide}
              />
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable accessibilityRole="button" onPress={() => setPhase("searching")} style={{ flex: 1 }}>
                  {({ pressed }) => (
                    <View style={{ minHeight: 48, borderRadius: 18, borderCurve: "continuous", borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", opacity: pressed ? 0.7 : 1 }}>
                      <Text style={[typography.small, { color: colors.dark }]}>Refresh ETA</Text>
                    </View>
                  )}
                </Pressable>
                <Pressable accessibilityRole="button" onPress={() => router.push("/qr")} style={{ flex: 1 }}>
                  {({ pressed }) => (
                    <View style={{ minHeight: 48, borderRadius: 18, borderCurve: "continuous", borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", opacity: pressed ? 0.7 : 1 }}>
                      <Text style={[typography.small, { color: colors.dark }]}>Scan QR</Text>
                    </View>
                  )}
                </Pressable>
              </View>
            </View>
          </BottomSheet>
        )}

        <BottomSheet>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={[typography.h2, { color: colors.dark }]}>Track ride live</Text>
              <Text style={[typography.small, { color: colors.muted }]}>ETA, vehicle, payment, and safety.</Text>
            </View>
            <Text style={[typography.h2, { color: colors.primary, fontVariant: ["tabular-nums"] }]}>{selectedBus.etaMinutes}m</Text>
          </View>
          <DriverCard busName={selectedBus.plateNumber} />
          <TripProgress phase={phase} />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9 }}>
            <FeaturePill icon="video" label="CCTV active" tone="success" />
            <FeaturePill icon="share-2" label="Share trip" tone="blue" />
            <FeaturePill icon="shield" label="Emergency contact" tone="warning" />
            <FeaturePill icon="credit-card" label="Payment ready" />
          </View>
        </BottomSheet>
    </AppShell>
  );
}

function MapPreview({ phase }: { phase: RidePhase }) {
  return (
    <LinearGradient
      colors={gradients.map}
      style={{
        height: 254,
        borderRadius: 32,
        borderCurve: "continuous",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.line,
        padding: 18,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <MapMarker label="Pickup" icon="navigation" />
        <TransportStatusBadge status={phase === "searching" ? "Searching" : phase === "inProgress" ? "In progress" : "Arriving"} />
      </View>
      <View style={{ gap: 12 }}>
        <View style={{ height: 8, borderRadius: 999, backgroundColor: "rgba(16, 24, 40, 0.09)", overflow: "hidden" }}>
          <View style={{ width: phase === "inProgress" ? "72%" : "45%", height: 8, borderRadius: 999, backgroundColor: colors.primary }} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <MapMarker label="Vehicle" icon="truck" />
          <MapMarker label="Destination" icon="map-pin" />
        </View>
      </View>
    </LinearGradient>
  );
}

function MapMarker({ label, icon }: { label: string; icon: keyof typeof Feather.glyphMap }) {
  return (
    <View style={{ alignItems: "center", gap: 6 }}>
      <View style={{ width: 42, height: 42, borderRadius: 16, borderCurve: "continuous", backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", boxShadow: "0 10px 20px rgba(16, 24, 40, 0.12)" }}>
        <Feather name={icon} size={19} color={colors.primary} />
      </View>
      <Text style={[typography.small, { color: colors.dark }]}>{label}</Text>
    </View>
  );
}

function FareEstimate({ fare, eta, duration }: { fare: number; eta: number; duration: string }) {
  return (
    <View style={{ padding: 15, borderRadius: 22, borderCurve: "continuous", backgroundColor: colors.faint, gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
        <Text style={[typography.h3, { color: colors.dark }]}>Fare estimate</Text>
        <Text style={[typography.h2, { color: colors.dark }]}>{fare} pts</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <FeaturePill icon="zap" label={`ETA ${eta} min`} />
        <FeaturePill icon="clock" label={duration} tone="blue" />
        <FeaturePill icon="shield" label="Verified" tone="success" />
      </View>
    </View>
  );
}

function DriverCard({ busName }: { busName: string }) {
  return (
    <View style={{ padding: 14, borderRadius: 22, borderCurve: "continuous", backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: colors.line, flexDirection: "row", alignItems: "center", gap: 12 }}>
      <View style={{ width: 46, height: 46, borderRadius: 17, borderCurve: "continuous", backgroundColor: colors.faint, alignItems: "center", justifyContent: "center" }}>
        <Feather name="truck" size={21} color={colors.primary} />
      </View>
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{busName}</Text>
        <Text style={[typography.small, { color: colors.muted }]}>Verified vehicle, electric minibus</Text>
      </View>
      <Feather name="phone" size={19} color={colors.primary} />
    </View>
  );
}

function TripProgress({ phase }: { phase: RidePhase }) {
  const steps = ["Confirmed", "Vehicle arriving", "Trip in progress", "Trip completed"];
  const activeIndex = phase === "confirmed" ? 0 : phase === "arriving" ? 1 : phase === "inProgress" ? 2 : -1;

  return (
    <View style={{ gap: 10 }}>
      {steps.map((step, index) => {
        const active = index <= activeIndex;
        return (
          <View key={step} style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: active ? colors.primary : colors.faint, alignItems: "center", justifyContent: "center" }}>
              <Feather name={active ? "check" : "circle"} size={12} color={active ? colors.surface : colors.softMuted} />
            </View>
            <Text style={[typography.small, { color: active ? colors.dark : colors.muted, flex: 1 }]}>{step}</Text>
          </View>
        );
      })}
    </View>
  );
}
