import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { Pressable, Text } from "react-native";

type Props = {
  firstName: string;
  onSwitchAccount: () => void;
};

export function AuthFallbackActions({ firstName, onSwitchAccount }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onSwitchAccount}
      style={{ alignItems: "center", paddingVertical: 4 }}
    >
      <Text style={[typography.small, { color: colors.muted }]}>
        Not {firstName}?{" "}
        <Text style={{ color: colors.primary }}>Switch account</Text>
      </Text>
    </Pressable>
  );
}
