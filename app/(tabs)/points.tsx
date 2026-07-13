import { GlassCard } from "@/components/cards/glass-card";
import { PointsCard } from "@/components/cards/points-card";
import { AppShell } from "@/components/navigation/app-shell";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SectionHeader } from "@/components/ui/section-header";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockPointTransactions } from "@/data/mockHistory";
import { mockUser } from "@/data/mockUser";
import { formatDate } from "@/lib/formatters";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function PointsScreen() {
  return (
    <AppShell showBottomNav>
      <Text style={[typography.h1, { color: colors.dark }]}>Points wallet</Text>
      <PointsCard points={mockUser.currentPoints} rank={mockUser.currentRank} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        <PrimaryButton label="Send Points" onPress={() => router.push("/send-points")} style={{ flex: 1, minWidth: 150 }} />
        <PrimaryButton label="Acquire Points" onPress={() => router.push("/acquire-points")} style={{ flex: 1, minWidth: 150 }} />
      </View>
      <GlassCard style={{ gap: 10 }}>
        <SectionHeader title="Summary" />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[typography.small, { color: colors.muted }]}>Earned points</Text>
          <Text style={[typography.small, { color: colors.success }]}>328</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[typography.small, { color: colors.muted }]}>Purchased points</Text>
          <Text style={[typography.small, { color: colors.primary }]}>900</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[typography.small, { color: colors.muted }]}>Rewards convertible</Text>
          <Text style={[typography.small, { color: colors.gold }]}>180</Text>
        </View>
      </GlassCard>
      <SectionHeader title="Recent transactions" />
      {mockPointTransactions.map((item) => (
        <GlassCard key={item.id} style={{ gap: 6 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
            <Text style={[typography.body, { color: colors.dark, fontWeight: "800", flex: 1 }]}>{item.description}</Text>
            <Text style={[typography.body, { color: item.amount > 0 ? colors.success : colors.error, fontWeight: "800" }]}>
              {item.amount > 0 ? "+" : ""}{item.amount}
            </Text>
          </View>
          <Text style={[typography.small, { color: colors.muted }]}>{formatDate(item.date)} • {item.status}</Text>
        </GlassCard>
      ))}
    </AppShell>
  );
}
