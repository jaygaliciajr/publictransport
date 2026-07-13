import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import type { Route } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { FeaturePill } from "../ride/feature-pill";
import { TransportStatusBadge } from "../ride/transport-status-badge";

export function RouteCard({ route, publicMode = false }: { route: Route; publicMode?: boolean }) {
  return (
    <Link href={`/routes/${route.id}`} asChild>
      <Pressable accessibilityRole="button" accessibilityLabel={`Open ${route.name}`}>
        {({ pressed }) => (
          <View
            style={{
              padding: 16,
              borderRadius: 26,
              borderCurve: "continuous",
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.line,
              gap: 14,
              opacity: pressed ? 0.76 : 1,
              boxShadow: "0 14px 30px rgba(16, 24, 40, 0.07)",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 18,
                  borderCurve: "continuous",
                  backgroundColor: colors.faint,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="map" size={22} color={colors.primary} />
              </View>
              <View style={{ flex: 1, gap: 5 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <Text style={[typography.h3, { color: colors.dark, flex: 1 }]}>{route.name}</Text>
                  <TransportStatusBadge status={route.status} />
                </View>
                <Text style={[typography.small, { color: colors.muted }]}>
                  {route.origin} to {route.destination}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              <FeaturePill icon="clock" label={route.estimatedTime} />
              <FeaturePill icon="credit-card" label={`${route.farePoints} pts`} tone="blue" />
              <FeaturePill icon="navigation" label={`${route.activeBuses} active`} tone="success" />
              <FeaturePill icon="zap" label={`ETA ${route.nextBusEta}`} />
            </View>
            <View style={{ height: 1, backgroundColor: colors.line }} />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <Text style={[typography.small, { color: colors.muted, flex: 1 }]}>
                {route.stops.length} stops, GPS tracking, cashless ready
              </Text>
              <Feather name="chevron-right" size={19} color={colors.muted} />
            </View>
            {publicMode ? (
              <Text style={[typography.small, { color: colors.primary }]}>View details without logging in</Text>
            ) : null}
          </View>
        )}
      </Pressable>
    </Link>
  );
}
