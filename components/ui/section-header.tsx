import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { Text, View } from "react-native";

type Props = {
  title: string;
  action?: string;
};

export function SectionHeader({ title, action }: Props) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <Text style={[typography.h2, { color: colors.dark }]}>{title}</Text>
      {action ? <Text style={[typography.small, { color: colors.primary }]}>{action}</Text> : null}
    </View>
  );
}
