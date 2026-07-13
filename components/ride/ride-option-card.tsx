import { FeaturePill } from "@/components/ride/feature-pill";
import { TransportStatusBadge } from "@/components/ride/transport-status-badge";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import type { Bus, Route } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, Text, View } from "react-native";

type Props = {
  route: Route;
  bus?: Bus;
  selected?: boolean;
  onPress?: () => void;
};

export function RideOptionCard({ route, bus, selected, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Choose ${route.name}`} onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{
            padding: 15,
            borderRadius: 24,
            borderCurve: "continuous",
            backgroundColor: selected ? colors.faint : colors.surface,
            borderWidth: 1.5,
            borderColor: selected ? colors.primary : colors.line,
            gap: 13,
            opacity: pressed ? 0.78 : 1,
            boxShadow: selected ? "0 16px 30px rgba(40, 189, 191, 0.14)" : "0 10px 24px rgba(16, 24, 40, 0.06)",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 17,
                borderCurve: "continuous",
                backgroundColor: colors.surface,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="truck" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <Text style={[typography.h3, { color: colors.dark, flex: 1 }]}>{bus?.plateNumber ?? "Nearby electric minibus"}</Text>
                <TransportStatusBadge status={bus?.capacityStatus ?? route.status} />
              </View>
              <Text style={[typography.small, { color: colors.muted }]}>
                {route.origin} to {route.destination}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            <FeaturePill icon="clock" label={`Arriving in ${bus?.etaMinutes ?? route.nextBusEta}`} />
            <FeaturePill icon="credit-card" label={`${route.farePoints} pts`} tone="blue" />
            <FeaturePill icon="users" label={bus?.capacityStatus ?? "Available"} tone={bus?.capacityStatus === "Full" ? "warning" : "success"} />
          </View>
        </View>
      )}
    </Pressable>
  );
}
