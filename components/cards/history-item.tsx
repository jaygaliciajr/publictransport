import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { formatDate, formatKg } from "@/lib/formatters";
import type { RideHistory } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";
import { GlassCard } from "./glass-card";

export function HistoryItem({ ride }: { ride: RideHistory }) {
  return (
    <GlassCard style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{ride.routeName}</Text>
          <Text style={[typography.small, { color: colors.muted }]}>
            {formatDate(ride.date)} • {ride.busId}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Feather name="check-circle" size={15} color={colors.success} />
          <Text style={[typography.small, { color: colors.success }]}>{ride.status}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[typography.small, { color: colors.muted }]}>Spent {ride.pointsSpent} pts</Text>
        <Text style={[typography.small, { color: colors.primary }]}>Earned {ride.pointsEarned} pts</Text>
        <Text style={[typography.small, { color: colors.success }]}>Saved {formatKg(ride.co2SavedKg)}</Text>
      </View>
    </GlassCard>
  );
}
