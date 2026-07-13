import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { progressPercent } from "@/lib/formatters";
import type { LoyaltyRank } from "@/types";
import { Text, View } from "react-native";
import { GlassCard } from "../cards/glass-card";
import { RankBadge } from "./rank-badge";

export function RankProgressCard({
  rank,
  nextRank,
  points,
}: {
  rank: LoyaltyRank;
  nextRank: LoyaltyRank;
  points: number;
}) {
  const progress = progressPercent(points, rank.minPoints, nextRank.minPoints);
  return (
    <GlassCard style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
        <RankBadge rankName={rank.name} />
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={[typography.h2, { color: colors.dark }]}>{rank.name} Eco Rider</Text>
          <Text style={[typography.small, { color: colors.muted }]}>
            {Math.round(progress)}% to {nextRank.name}
          </Text>
        </View>
      </View>
      <View style={{ height: 12, borderRadius: 999, backgroundColor: colors.faint, overflow: "hidden" }}>
        <View style={{ width: `${progress}%`, height: "100%", borderRadius: 999, backgroundColor: colors.primary }} />
      </View>
      <Text style={[typography.small, { color: colors.muted }]}>
        Next target: {nextRank.minPoints.toLocaleString("en-PH")} loyalty points
      </Text>
    </GlassCard>
  );
}
