import { colors, gradients } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type Props = {
  hasFaceId: boolean;
  loading: boolean;
  onPress: () => void;
};

export function BiometricUnlockButton({ hasFaceId, loading, onPress }: Props) {
  const label = hasFaceId ? "Unlock with Face ID" : "Unlock with Biometrics";
  const icon: keyof typeof Feather.glyphMap = hasFaceId ? "eye" : "activity";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={loading}
      onPress={onPress}
    >
      {({ pressed }) => (
        <LinearGradient
          colors={gradients.brand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            minHeight: 58,
            borderRadius: 20,
            borderCurve: "continuous",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            opacity: pressed || loading ? 0.82 : 1,
            boxShadow: "0 12px 28px rgba(40, 189, 191, 0.30)",
          }}
        >
          {loading ? (
            <ActivityIndicator color={colors.surface} size="small" />
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Feather name={icon} size={20} color={colors.surface} />
              <Text style={[typography.body, { color: colors.surface, fontWeight: "800" }]}>
                {label}
              </Text>
            </View>
          )}
        </LinearGradient>
      )}
    </Pressable>
  );
}
