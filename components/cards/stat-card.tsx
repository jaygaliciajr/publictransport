import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";
import { GlassCard } from "./glass-card";

type Props = {
  label: string;
  value: string;
  icon: keyof typeof Feather.glyphMap;
  tone?: string;
};

export function StatCard({ label, value, icon, tone = colors.primary }: Props) {
  return (
    <GlassCard style={{ flex: 1, minWidth: 145, gap: 10 }}>
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 14,
          backgroundColor: `${tone}18`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather name={icon} size={18} color={tone} />
      </View>
      <Text style={[typography.h2, { color: colors.dark }]}>{value}</Text>
      <Text style={[typography.small, { color: colors.muted }]}>{label}</Text>
    </GlassCard>
  );
}
