import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";

type Props = {
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  active?: boolean;
};

export function PaymentMethodCard({ title, description, icon, active }: Props) {
  return (
    <View
      style={{
        padding: 15,
        borderRadius: 22,
        borderCurve: "continuous",
        backgroundColor: active ? colors.faint : colors.surface,
        borderWidth: 1,
        borderColor: active ? colors.primary : colors.line,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          borderRadius: 16,
          borderCurve: "continuous",
          backgroundColor: colors.surface,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather name={icon} size={19} color={colors.primary} />
      </View>
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{title}</Text>
        <Text style={[typography.small, { color: colors.muted }]}>{description}</Text>
      </View>
      {active ? <Feather name="check-circle" size={19} color={colors.primary} /> : null}
    </View>
  );
}
