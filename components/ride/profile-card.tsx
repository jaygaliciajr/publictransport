import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import type { User } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { Text, View } from "react-native";

export function ProfileCard({ user }: { user: User }) {
  return (
    <View
      style={{
        padding: 18,
        borderRadius: 28,
        borderCurve: "continuous",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        boxShadow: "0 16px 32px rgba(16, 24, 40, 0.08)",
      }}
    >
      <Image source={{ uri: user.avatarUrl }} style={{ width: 62, height: 62, borderRadius: 31 }} />
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={[typography.h3, { color: colors.dark }]}>{user.fullName}</Text>
        <Text style={[typography.small, { color: colors.muted }]}>{user.passengerId}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Feather name="shield" size={13} color={colors.success} />
          <Text style={[typography.small, { color: colors.success }]}>Verified passenger</Text>
        </View>
      </View>
    </View>
  );
}
