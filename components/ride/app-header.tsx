import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  avatarUrl?: string;
  onProfilePress?: () => void;
};

export function AppHeader({ eyebrow, title, subtitle, avatarUrl, onProfilePress }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <View style={{ flex: 1, gap: 3 }}>
        {eyebrow ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Feather name="map-pin" size={13} color={colors.primary} />
            <Text style={[typography.small, { color: colors.muted }]}>{eyebrow}</Text>
          </View>
        ) : null}
        <Text style={[typography.h1, { color: colors.dark }]}>{title}</Text>
        {subtitle ? <Text style={[typography.small, { color: colors.muted }]}>{subtitle}</Text> : null}
      </View>
      {avatarUrl ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Open profile" onPress={onProfilePress}>
          {({ pressed }) => (
            <Image
              source={{ uri: avatarUrl }}
              style={{
                width: 46,
                height: 46,
                borderRadius: 17,
                opacity: pressed ? 0.72 : 1,
              }}
            />
          )}
        </Pressable>
      ) : null}
    </View>
  );
}
