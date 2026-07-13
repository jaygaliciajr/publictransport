import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { IconButton } from "../ui/icon-button";

type Props = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  right?: React.ReactNode;
};

export function ScreenHeader({ title, subtitle, showBack, right }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      {showBack ? <IconButton icon="chevron-left" label="Go back" onPress={() => router.back()} /> : null}
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={[typography.h1, { color: colors.dark }]}>{title}</Text>
        {subtitle ? <Text style={[typography.small, { color: colors.muted }]}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}
