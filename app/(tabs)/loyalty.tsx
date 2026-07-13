import { GradientCard } from "@/components/cards/gradient-card";
import { StatCard } from "@/components/cards/stat-card";
import { LeaderboardCard } from "@/components/loyalty/leaderboard-card";
import { LeaderboardPreview } from "@/components/loyalty/leaderboard-preview";
import { RankBadge } from "@/components/loyalty/rank-badge";
import { RankProgressCard } from "@/components/loyalty/rank-progress-card";
import { AppShell } from "@/components/navigation/app-shell";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SectionHeader } from "@/components/ui/section-header";
import { colors } from "@/constants/colors";
import { loyaltyRanks } from "@/constants/ranks";
import { typography } from "@/constants/typography";
import { mockLeaderboard } from "@/data/mockLeaderboard";
import { mockUser } from "@/data/mockUser";
import { formatKg, formatPoints } from "@/lib/formatters";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function LoyaltyScreen() {
  const rank = loyaltyRanks.find((item) => item.name === mockUser.currentRank) ?? loyaltyRanks[0];
  const nextRank = loyaltyRanks[loyaltyRanks.findIndex((item) => item.id === rank.id) + 1] ?? rank;
  return (
    <AppShell showBottomNav>
      <Text style={[typography.h1, { color: colors.dark }]}>Loyalty</Text>
      <GradientCard colors={rank.gradient} style={{ gap: 18 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <Image source={{ uri: mockUser.avatarUrl }} style={{ width: 72, height: 72, borderRadius: 36 }} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={[typography.h2, { color: colors.surface }]}>{mockUser.fullName}</Text>
            <Text style={[typography.small, { color: "rgba(255,255,255,0.82)" }]}>{formatPoints(mockUser.loyaltyPoints)} loyalty points</Text>
          </View>
          <RankBadge rankName={mockUser.currentRank} size="sm" />
        </View>
        <Text style={[typography.title, { color: colors.surface }]}>{rank.theme}</Text>
        <Text style={[typography.body, { color: "rgba(255,255,255,0.86)" }]}>
          Your rides are growing a cleaner future.
        </Text>
      </GradientCard>
      <RankProgressCard rank={rank} nextRank={nextRank} points={mockUser.loyaltyPoints} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        <StatCard icon="feather" label="CO2 this month" value={formatKg(12.4)} tone={colors.success} />
        <StatCard icon="bar-chart-2" label="Monthly rank" value="#2" tone={colors.primary} />
      </View>
      <GradientCard colors={["#155E63", "#28BDBF"]} style={{ gap: 8 }}>
        <Text style={[typography.h2, { color: colors.surface }]}>You helped reduce 12.4kg CO2 this month</Text>
        <Text style={[typography.body, { color: "rgba(255,255,255,0.86)" }]}>
          Electric rides keep the air cleaner for every commuter.
        </Text>
      </GradientCard>
      <SectionHeader title="Top Eco Riders" action="Annual" />
      <LeaderboardPreview users={mockLeaderboard} />
      {mockLeaderboard.slice(3, 5).map((user, index) => (
        <LeaderboardCard key={user.id} user={user} position={index + 4} />
      ))}
      <PrimaryButton label="See more rankings" onPress={() => router.push("/ranking")} />
    </AppShell>
  );
}
