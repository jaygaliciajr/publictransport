import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  icon?: keyof typeof Feather.glyphMap;
  style?: StyleProp<ViewStyle>;
};

export function SecondaryButton({ label, onPress, icon, style }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={style}>
      {({ pressed }) => (
        <View
          style={[
            {
              minHeight: 52,
              paddingHorizontal: 18,
              borderRadius: 18,
              borderCurve: "continuous",
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.line,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.7 : 1,
              flexDirection: "row",
              gap: 8,
            },
            style,
          ]}
        >
          {icon ? <Feather name={icon} size={17} color={colors.dark} /> : null}
          <Text style={[typography.body, { color: colors.dark, textAlign: "center" }]}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}
