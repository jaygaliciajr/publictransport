import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, Text, View } from "react-native";

export type DashboardMenuConfig = {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  primary?: boolean;
};

export function DashboardMenuGrid({ items }: { items: DashboardMenuConfig[] }) {
  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 26,
        borderCurve: "continuous",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(40,189,191,0.13)",
      }}
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {items.map((item, index) => (
          <DashboardMenuItem key={item.label} item={item} index={index} total={items.length} />
        ))}
      </View>
    </View>
  );
}

export function DashboardMenuItem({ item, index, total }: { item: DashboardMenuConfig; index: number; total: number }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={item.label} onPress={item.onPress} style={{ width: "50%" }}>
      {({ pressed }) => (
        <View
          style={{
            minHeight: 98,
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            borderRightWidth: index % 2 === 0 ? 1 : 0,
            borderBottomWidth: index < total - 2 ? 1 : 0,
            borderColor: "rgba(15,23,42,0.08)",
            backgroundColor: item.primary ? "rgba(40,189,191,0.08)" : "transparent",
            opacity: pressed ? 0.66 : 1,
          }}
        >
          <Feather name={item.icon} size={34} color={colors.primary} />
          <Text style={[typography.small, { color: colors.dark, fontWeight: "900", letterSpacing: 0.7 }]}>
            {item.label.toUpperCase()}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
