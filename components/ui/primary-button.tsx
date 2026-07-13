import { colors, gradients } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: keyof typeof Feather.glyphMap;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({ label, onPress, disabled, icon, style }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} disabled={disabled} onPress={onPress} style={style}>
      {({ pressed }) => (
        <LinearGradient
          colors={disabled ? ["#A8C3C7", "#A8C3C7"] : gradients.brand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            {
              minHeight: 54,
              borderRadius: 19,
              borderCurve: "continuous",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 18,
              opacity: pressed ? 0.86 : 1,
              boxShadow: "0 12px 24px rgba(40, 189, 191, 0.24)",
            },
            style,
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {icon ? <Feather name={icon} size={18} color={colors.surface} /> : null}
            <Text style={[typography.body, { color: colors.surface, fontWeight: "800" }]}>{label}</Text>
          </View>
        </LinearGradient>
      )}
    </Pressable>
  );
}
