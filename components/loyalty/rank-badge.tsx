import { loyaltyRanks } from "@/constants/ranks";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

export function RankBadge({ rankName, size = "md" }: { rankName: string; size?: "sm" | "md" | "lg" }) {
  const rank = loyaltyRanks.find((item) => item.name === rankName) ?? loyaltyRanks[0];
  const dimension = size === "lg" ? 104 : size === "sm" ? 46 : 68;
  const iconSize = size === "lg" ? 40 : size === "sm" ? 18 : 26;
  return (
    <View style={{ alignItems: "center", gap: 8 }}>
      <LinearGradient
        colors={rank.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 3,
          borderColor: "rgba(255,255,255,0.7)",
          boxShadow: "0 14px 28px rgba(15, 23, 42, 0.18)",
        }}
      >
        <Feather name={rank.badge as keyof typeof Feather.glyphMap} size={iconSize} color="#FFFFFF" />
      </LinearGradient>
      {size !== "sm" ? <Text style={[typography.small, { color: "#0F172A" }]}>{rank.theme}</Text> : null}
    </View>
  );
}
