import { AppHeader } from "@/components/ride/app-header";
import { BottomSheet } from "@/components/ride/bottom-sheet";
import { FeaturePill } from "@/components/ride/feature-pill";
import { LocationSearchInput } from "@/components/ride/location-search-input";
import { AppShell } from "@/components/navigation/app-shell";
import { ReservationCard, type Reservation } from "@/components/ride/reservation-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { EmptyState, SuccessState } from "@/components/ui/state-views";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockRoutes } from "@/data/mockRoutes";
import { mockUser } from "@/data/mockUser";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const upcomingReservations: Reservation[] = [
  {
    id: "res-1",
    routeName: "Dasmarinas Loop",
    pickup: "Robinsons Dasmarinas",
    destination: "DBB-C City Terminal",
    date: "Today",
    time: "5:30 PM",
    seats: 1,
    status: "Confirmed",
  },
];

export default function ReservationsScreen() {
  const [pickup, setPickup] = useState("Brgy. San Luis, GMA Cavite");
  const [destination, setDestination] = useState("Festival Mall Alabang");
  const [selectedRoute, setSelectedRoute] = useState(mockRoutes[1]?.id ?? mockRoutes[0]?.id);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <AppShell keyboardShouldPersistTaps="handled" showBottomNav>
        <AppHeader
          title="Reserve a seat"
          subtitle="Choose pickup, route, and time."
          avatarUrl={mockUser.avatarUrl}
          onProfilePress={() => router.push("/menu")}
        />

        <BottomSheet>
          <View style={{ gap: 5 }}>
            <Text style={[typography.h2, { color: colors.dark }]}>Reservation details</Text>
            <Text style={[typography.small, { color: colors.muted }]}>Set your trip details.</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <PickerTile icon="calendar" label="Date" value="Today" />
            <PickerTile icon="clock" label="Time" value="5:30 PM" />
          </View>
          <LocationSearchInput pickup={pickup} destination={destination} onChangePickup={setPickup} onChangeDestination={setDestination} compact />
          <View style={{ gap: 10 }}>
            {mockRoutes.map((route) => (
              <Pressable key={route.id} accessibilityRole="button" onPress={() => setSelectedRoute(route.id)}>
                {({ pressed }) => {
                  const selected = selectedRoute === route.id;
                  return (
                    <View
                      style={{
                        padding: 14,
                        borderRadius: 22,
                        borderCurve: "continuous",
                        backgroundColor: selected ? colors.faint : colors.surface,
                        borderWidth: 1,
                        borderColor: selected ? colors.primary : colors.line,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                        opacity: pressed ? 0.72 : 1,
                      }}
                    >
                      <Feather name="truck" size={20} color={colors.primary} />
                      <View style={{ flex: 1, gap: 3 }}>
                        <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{route.name}</Text>
                        <Text style={[typography.small, { color: colors.muted }]}>{route.nextBusEta} ETA, {route.farePoints} pts</Text>
                      </View>
                      {selected ? <Feather name="check-circle" size={19} color={colors.primary} /> : null}
                    </View>
                  );
                }}
              </Pressable>
            ))}
          </View>
          <PrimaryButton label="Confirm reservation" icon="check-circle" onPress={() => setConfirmed(true)} />
          {confirmed ? <SuccessState title="Reservation confirmed" body="Your seat is ready." /> : null}
        </BottomSheet>

        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <Text style={[typography.h2, { color: colors.dark }]}>Upcoming</Text>
            <FeaturePill icon="bell" label="Reminder on" tone="blue" />
          </View>
          {upcomingReservations.length ? (
            upcomingReservations.map((reservation) => <ReservationCard key={reservation.id} reservation={reservation} />)
          ) : (
            <EmptyState title="No reservations yet" body="Reserve a seat for your next commute." />
          )}
        </View>
    </AppShell>
  );
}

function PickerTile({ icon, label, value }: { icon: keyof typeof Feather.glyphMap; label: string; value: string }) {
  return (
    <View
      style={{
        flex: 1,
        padding: 14,
        borderRadius: 22,
        borderCurve: "continuous",
        backgroundColor: colors.surfaceElevated,
        borderWidth: 1,
        borderColor: colors.line,
        gap: 8,
      }}
    >
      <Feather name={icon} size={18} color={colors.primary} />
      <View style={{ gap: 2 }}>
        <Text style={[typography.small, { color: colors.muted }]}>{label}</Text>
        <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{value}</Text>
      </View>
    </View>
  );
}
