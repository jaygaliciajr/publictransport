import { GlassCard } from "@/components/cards/glass-card";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { Image } from "expo-image";
import { Text, View } from "react-native";

type Props = {
  firstName: string;
  maskedEmail: string;
  avatarUrl?: string;
  initials: string;
};

export function SavedUserIdentityCard({ firstName, maskedEmail, avatarUrl, initials }: Props) {
  return (
    <GlassCard style={{ alignItems: "center", paddingVertical: 24, gap: 12 }}>
      <View>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={{ width: 84, height: 84, borderRadius: 42 }}
            contentFit="cover"
          />
        ) : (
          <View
            style={{
              width: 84,
              height: 84,
              borderRadius: 42,
              backgroundColor: colors.faint,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: colors.primary,
            }}
          >
            <Text style={[typography.h2, { color: colors.primary }]}>{initials}</Text>
          </View>
        )}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: colors.success,
            borderWidth: 2,
            borderColor: colors.surface,
          }}
        />
      </View>
      <View style={{ alignItems: "center", gap: 4 }}>
        <Text style={[typography.h3, { color: colors.dark }]}>{firstName}</Text>
        <Text style={[typography.small, { color: colors.muted }]}>{maskedEmail}</Text>
      </View>
    </GlassCard>
  );
}
