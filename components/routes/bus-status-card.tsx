import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import type { Bus } from "@/types";
import { Text, View } from "react-native";
import { GlassCard } from "../cards/glass-card";
import { FeaturePill } from "../ride/feature-pill";
import { TransportStatusBadge } from "../ride/transport-status-badge";

export function BusStatusCard({ bus }: { bus: Bus }) {
  return (
    <GlassCard style={{ gap: 13 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <View style={{ gap: 4 }}>
          <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{bus.plateNumber}</Text>
          <Text style={[typography.small, { color: colors.muted }]}>
            {bus.currentStop} to {bus.nextStop}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end", gap: 6 }}>
          <Text style={[typography.h2, { color: colors.primary, fontVariant: ["tabular-nums"] }]}>{bus.etaMinutes}m</Text>
          <TransportStatusBadge status={bus.capacityStatus} />
        </View>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        <FeaturePill icon="users" label={bus.capacityStatus} tone={bus.capacityStatus === "Full" ? "warning" : "success"} />
        {bus.hasWifi ? <FeaturePill icon="wifi" label="Wi-Fi" tone="blue" /> : null}
        {bus.hasCctv ? <FeaturePill icon="video" label="CCTV" /> : null}
        {bus.isElectric ? <FeaturePill icon="battery-charging" label="Electric" /> : null}
      </View>
    </GlassCard>
  );
}
