import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import type { Stop } from "@/types";
import { Text, View } from "react-native";

export function StopTimeline({ stops }: { stops: Stop[] }) {
  return (
    <View style={{ gap: 0 }}>
      {stops.map((stop, index) => (
        <View key={stop.id} style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: index === 0 ? colors.primary : colors.surface,
                borderWidth: 3,
                borderColor: colors.primary,
              }}
            />
            {index < stops.length - 1 ? <View style={{ width: 2, flex: 1, minHeight: 34, backgroundColor: colors.line }} /> : null}
          </View>
          <View style={{ flex: 1, paddingBottom: 18, gap: 2 }}>
            <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{stop.name}</Text>
            <Text style={[typography.small, { color: colors.muted }]}>Arrives {stop.eta}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
