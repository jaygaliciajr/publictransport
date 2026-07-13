import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import type { User } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { Pressable, Text, useWindowDimensions, View } from "react-native";

type Props = {
  user: User;
  onProfilePress?: () => void;
  onWalletPress?: () => void;
};

export function PremiumTopArea({ user, onProfilePress, onWalletPress }: Props) {
  const { width } = useWindowDimensions();
  const compact = width < 430;

  return (
    <View
      style={{
        borderRadius: 28,
        borderCurve: "continuous",
        backgroundColor: "rgba(255,255,255,0.98)",
        borderWidth: 1,
        borderColor: colors.line,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 14px 30px rgba(16, 24, 40, 0.1)",
      }}
    >
      <Pressable accessibilityRole="button" accessibilityLabel="Open profile" onPress={onProfilePress}>
        {({ pressed }) => (
          <Image
            source={{ uri: user.avatarUrl }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 18,
              opacity: pressed ? 0.74 : 1,
            }}
          />
        )}
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Open profile" onPress={onProfilePress} style={{ flex: 1 }}>
        {({ pressed }) => (
          <View style={{ gap: 3, opacity: pressed ? 0.74 : 1 }}>
            <Text style={[typography.small, { color: colors.muted }]}>Good day</Text>
            <Text style={[typography.h3, { color: colors.dark }]} numberOfLines={1}>
              {user.fullName.split(" ")[0]}
            </Text>
          </View>
        )}
      </Pressable>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {compact ? null : <InfoPill icon="award" label={user.currentRank} />}
        <Pressable accessibilityRole="button" accessibilityLabel="Open points wallet" onPress={onWalletPress}>
          {({ pressed }) => (
            <View style={{ opacity: pressed ? 0.72 : 1 }}>
              <InfoPill icon="credit-card" label={`${user.currentPoints} pts`} strong />
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

function InfoPill({
  icon,
  label,
  strong,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  strong?: boolean;
}) {
  return (
    <View
      style={{
        minHeight: 38,
        paddingHorizontal: 10,
        borderRadius: 999,
        backgroundColor: strong ? colors.faint : colors.surfaceElevated,
        borderWidth: 1,
        borderColor: strong ? `${colors.primary}55` : colors.line,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
      }}
    >
      <Feather name={icon} size={14} color={strong ? colors.primary : colors.muted} />
      <Text style={[typography.small, { color: colors.dark }]}>{label}</Text>
    </View>
  );
}
