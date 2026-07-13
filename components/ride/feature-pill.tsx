import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  tone?: "brand" | "blue" | "success" | "warning" | "neutral";
};

const toneMap = {
  brand: { bg: colors.faint, fg: colors.primary },
  blue: { bg: colors.faintBlue, fg: colors.secondary },
  success: { bg: "#EAFBF1", fg: colors.success },
  warning: { bg: "#FFF7E8", fg: colors.warning },
  neutral: { bg: "#F2F4F7", fg: colors.muted },
};

export function FeaturePill({ icon, label, tone = "brand" }: Props) {
  const toneStyle = toneMap[tone];

  return (
    <View
      style={{
        minHeight: 36,
        paddingHorizontal: 11,
        borderRadius: 999,
        backgroundColor: toneStyle.bg,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
      }}
    >
      <Feather name={icon} size={14} color={toneStyle.fg} />
      <Text style={[typography.small, { color: colors.dark }]}>{label}</Text>
    </View>
  );
}
