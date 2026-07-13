import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { formatKg, formatPoints } from "@/lib/formatters";
import type { LeaderboardUser } from "@/types";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { GlassCard } from "../cards/glass-card";
import { RankBadge } from "./rank-badge";

export function LeaderboardCard({
  user,
  position,
  premium = false,
  compact = false,
}: {
  user: LeaderboardUser;
  position: number;
  premium?: boolean;
  compact?: boolean;
}) {
  return (
    <GlassCard style={{ gap: 12, minWidth: compact ? 142 : undefined, flex: compact ? 1 : undefined }}>
      <View style={{ flexDirection: premium ? "column" : "row", alignItems: premium ? "center" : "flex-start", gap: 12 }}>
        <Text style={[typography.h2, { color: colors.primary }]}>#{position}</Text>
        <Image
          source={{ uri: user.avatarUrl }}
          style={{ width: premium ? 64 : 48, height: premium ? 64 : 48, borderRadius: premium ? 32 : 24 }}
        />
        <View style={{ flex: 1, alignItems: premium ? "center" : "flex-start", gap: 4 }}>
          <Text style={[typography.body, { color: colors.dark, fontWeight: "800", textAlign: premium ? "center" : "left" }]}>
            {user.name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <RankBadge rankName={user.rank} size="sm" />
            <Text style={[typography.small, { color: colors.muted }]}>{user.rank}</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
        <Metric label="Rides" value={`${user.ridesCount}`} />
        <Metric label="CO2" value={formatKg(user.co2SavedKg)} />
        <Metric label="Pts" value={formatPoints(user.loyaltyPoints)} />
      </View>
    </GlassCard>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ gap: 2 }}>
      <Text style={[typography.small, { color: colors.dark, fontVariant: ["tabular-nums"] }]}>{value}</Text>
      <Text style={[typography.small, { color: colors.muted }]}>{label}</Text>
    </View>
  );
}
