import { colors } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, View, ViewStyle } from "react-native";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export function IconButton({ icon, label, onPress, style }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            {
              width: 46,
              height: 46,
              borderRadius: 16,
              borderCurve: "continuous",
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.line,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.65 : 1,
            },
            style,
          ]}
        >
          <Feather name={icon} size={20} color={colors.dark} />
        </View>
      )}
    </Pressable>
  );
}
