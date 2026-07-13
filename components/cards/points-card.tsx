import { colors, gradients } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { formatPoints } from "@/lib/formatters";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";
import { GradientCard } from "./gradient-card";

export function PointsCard({ points, rank }: { points: number; rank: string }) {
  return (
    <GradientCard colors={gradients.darkBrand} style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={[typography.small, { color: "rgba(255,255,255,0.82)" }]}>Ride points</Text>
        <Feather name="credit-card" color={colors.surface} size={22} />
      </View>
      <Text style={[typography.title, { color: colors.surface, fontVariant: ["tabular-nums"] }]}>
        {formatPoints(points)}
      </Text>
      <Text style={[typography.body, { color: "rgba(255,255,255,0.9)" }]}>{rank} Eco Rider</Text>
    </GradientCard>
  );
}
