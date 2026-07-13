import { View } from "react-native";
import type { LeaderboardUser } from "@/types";
import { LeaderboardCard } from "./leaderboard-card";

export function LeaderboardPreview({ users }: { users: LeaderboardUser[] }) {
  const topThree = users.slice(0, 3);
  const [first, ...nextTwo] = topThree;

  return (
    <View style={{ gap: 10 }}>
      {first ? <LeaderboardCard user={first} position={1} premium /> : null}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {nextTwo.map((user, index) => (
          <LeaderboardCard key={user.id} user={user} position={index + 2} premium compact />
        ))}
      </View>
    </View>
  );
}
