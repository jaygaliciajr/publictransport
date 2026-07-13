import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";

export function FeatureIconCard({ icon, label }: { icon: keyof typeof Feather.glyphMap; label: string }) {
  return (
    <View
      style={{
        flexBasis: "31%",
        flexGrow: 1,
        minHeight: 88,
        padding: 12,
        borderRadius: 22,
        borderCurve: "continuous",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        gap: 9,
      }}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 13,
          borderCurve: "continuous",
          backgroundColor: colors.faint,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather name={icon} size={16} color={colors.primary} />
      </View>
      <Text style={[typography.small, { color: colors.dark }]}>{label}</Text>
    </View>
  );
}
