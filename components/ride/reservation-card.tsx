import { TransportStatusBadge } from "@/components/ride/transport-status-badge";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";

export type Reservation = {
  id: string;
  routeName: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  status: "Confirmed" | "Searching" | "Completed";
};

export function ReservationCard({ reservation }: { reservation: Reservation }) {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 24,
        borderCurve: "continuous",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        gap: 14,
        boxShadow: "0 12px 26px rgba(16, 24, 40, 0.07)",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
        <View style={{ flex: 1, gap: 5 }}>
          <Text style={[typography.h3, { color: colors.dark }]}>{reservation.routeName}</Text>
          <Text style={[typography.small, { color: colors.muted }]}>
            {reservation.pickup} to {reservation.destination}
          </Text>
        </View>
        <TransportStatusBadge status={reservation.status} />
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Metric icon="calendar" label={reservation.date} />
        <Metric icon="clock" label={reservation.time} />
        <Metric icon="users" label={`${reservation.seats} seat`} />
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <SecondaryButton label="Reschedule" icon="calendar" style={{ flex: 1, minHeight: 46 }} />
        <SecondaryButton label="Cancel" icon="x" style={{ flex: 1, minHeight: 46 }} />
      </View>
    </View>
  );
}

function Metric({ icon, label }: { icon: keyof typeof Feather.glyphMap; label: string }) {
  return (
    <View style={{ flex: 1, gap: 5 }}>
      <Feather name={icon} size={15} color={colors.primary} />
      <Text style={[typography.small, { color: colors.dark }]}>{label}</Text>
    </View>
  );
}
