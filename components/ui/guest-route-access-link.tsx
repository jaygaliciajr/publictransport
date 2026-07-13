import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function GuestRouteAccessLink() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Check routes without logging in"
      onPress={() => router.push("/route-preview" as any)}
      style={{ alignItems: "center", paddingVertical: 4 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Feather name="map" size={14} color={colors.muted} />
        <Text style={[typography.small, { color: colors.muted }]}>
          Check routes{" "}
          <Text style={{ color: colors.primary }}>without logging in</Text>
        </Text>
      </View>
    </Pressable>
  );
}
