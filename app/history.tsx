import { HistoryItem } from "@/components/cards/history-item";
import { StatCard } from "@/components/cards/stat-card";
import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { SectionHeader } from "@/components/ui/section-header";
import { EmptyState } from "@/components/ui/state-views";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockHistory } from "@/data/mockHistory";
import { formatKg } from "@/lib/formatters";
import { Text, View } from "react-native";

export default function HistoryScreen() {
  return (
    <AppShell>
      <ScreenHeader title="Ride history" subtitle="Trips, points, and clean travel impact." showBack />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        <StatCard icon="navigation" label="Monthly rides" value="18" />
        <StatCard icon="credit-card" label="Points used" value="612" tone={colors.warning} />
        <StatCard icon="award" label="Points earned" value="328" tone={colors.gold} />
        <StatCard icon="feather" label="CO2 saved" value={formatKg(12.4)} tone={colors.success} />
      </View>
      <SectionHeader title="Monthly performance" />
      <View style={{ height: 150, flexDirection: "row", alignItems: "flex-end", gap: 9, padding: 16, borderRadius: 24, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
        {[40, 68, 52, 84, 72, 96].map((height, index) => (
          <View key={index} style={{ flex: 1, gap: 8, alignItems: "center" }}>
            <View style={{ width: "100%", height, borderRadius: 999, backgroundColor: index === 5 ? colors.primary : colors.faint }} />
            <Text style={[typography.small, { color: colors.muted }]}>{index + 1}</Text>
          </View>
        ))}
      </View>
      <SectionHeader title="Recent rides" />
      {mockHistory.length ? mockHistory.map((ride) => <HistoryItem key={ride.id} ride={ride} />) : <EmptyState title="No ride history yet" body="Your completed trips will appear here." />}
    </AppShell>
  );
}
