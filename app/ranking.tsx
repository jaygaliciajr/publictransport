import { LeaderboardCard } from "@/components/loyalty/leaderboard-card";
import { LeaderboardPreview } from "@/components/loyalty/leaderboard-preview";
import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockLeaderboard } from "@/data/mockLeaderboard";
import { Text } from "react-native";

export default function RankingScreen() {
  return (
    <AppShell>
      <ScreenHeader title="Top Eco Riders" subtitle="Passengers making cleaner trips every month." showBack />
      <LeaderboardPreview users={mockLeaderboard} />
      <Text style={[typography.h2, { color: colors.dark }]}>Full leaderboard</Text>
      {mockLeaderboard.map((user, index) => (
        <LeaderboardCard key={user.id} user={user} position={index + 1} />
      ))}
    </AppShell>
  );
}
