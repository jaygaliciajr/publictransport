import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockUser } from "@/data/mockUser";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

type LocationState = "ready" | "loading" | "unavailable" | "offline";

export function DashboardHeader({
  location = "Brgy. San Luis, GMA Cavite",
  state = "ready",
  onMenuPress,
  onProfilePress,
}: {
  location?: string;
  state?: LocationState;
  onMenuPress?: () => void;
  onProfilePress?: () => void;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <HeaderButton icon="menu" label="Open menu" onPress={onMenuPress} />
      <View style={{ flex: 1, alignItems: "center", gap: 3 }}>
        <Feather name={state === "offline" ? "wifi-off" : "navigation"} size={18} color={colors.primary} />
        <Text style={[typography.small, { color: colors.muted, fontWeight: "700", textAlign: "center" }]}>Your location</Text>
        <Text style={[typography.body, { color: colors.dark, fontWeight: "800", textAlign: "center" }]}>
          {locationText(location, state)}
        </Text>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Open profile" onPress={onProfilePress}>
        {({ pressed }) => (
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.surface,
              opacity: pressed ? 0.72 : 1,
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.1)",
            }}
          >
            <Image source={{ uri: mockUser.avatarUrl }} style={{ width: 42, height: 42, borderRadius: 21 }} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

function HeaderButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.surface,
            opacity: pressed ? 0.72 : 1,
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.1)",
          }}
        >
          <Feather name={icon} size={24} color={colors.primary} />
        </View>
      )}
    </Pressable>
  );
}

function locationText(location: string, state: LocationState) {
  if (state === "loading") return "Finding nearest stop";
  if (state === "unavailable") return "Location unavailable";
  if (state === "offline") return "Offline mode";
  return location;
}
