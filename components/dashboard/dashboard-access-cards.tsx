import { RankBadge } from "@/components/loyalty/rank-badge";
import { colors } from "@/constants/colors";
import { gradients } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { formatPoints } from "@/lib/formatters";
import type { User } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

export function DashboardPointsCard({ points, onPress }: { points: number; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Open points wallet" onPress={onPress}>
      {({ pressed }) => (
        <LinearGradient
          colors={gradients.darkBrand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 24,
            borderCurve: "continuous",
            padding: 16,
            gap: 8,
            opacity: pressed ? 0.76 : 1,
            boxShadow: "0 14px 24px rgba(40, 189, 191, 0.2)",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={[typography.small, { color: "rgba(255,255,255,0.82)" }]}>Ride points</Text>
            <Feather name="credit-card" color={colors.surface} size={18} />
          </View>
          <Text style={[typography.title, { color: colors.surface, fontVariant: ["tabular-nums"] }]}>{formatPoints(points)}</Text>
          <Text style={[typography.small, { color: "rgba(255,255,255,0.86)" }]}>Tap to manage wallet</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

export function ProfileLoyaltyCard({ user, onPress }: { user: User; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Open loyalty profile" onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            padding: 14,
            borderRadius: 24,
            borderCurve: "continuous",
            backgroundColor: "rgba(255,255,255,0.9)",
            borderWidth: 1,
            borderColor: "rgba(40,189,191,0.14)",
            opacity: pressed ? 0.72 : 1,
          }}
        >
          <Image source={{ uri: user.avatarUrl }} style={{ width: 52, height: 52, borderRadius: 26 }} />
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={[typography.h2, { color: colors.dark }]}>hello {firstName(user.fullName)}!</Text>
            <Text style={[typography.small, { color: colors.muted }]}>
              {user.currentRank} Eco Rider • {formatPoints(user.loyaltyPoints)} loyalty pts
            </Text>
          </View>
          <RankBadge rankName={user.currentRank} size="sm" />
        </View>
      )}
    </Pressable>
  );
}

function firstName(name: string) {
  return name.split(" ")[0] ?? name;
}
