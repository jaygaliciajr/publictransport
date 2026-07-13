import { loyaltyRanks } from "@/constants/ranks";
import { mockLeaderboard } from "@/data/mockLeaderboard";
import { mockUser } from "@/data/mockUser";

export async function getCurrentRank() {
  return loyaltyRanks.find((rank) => rank.name === mockUser.currentRank) ?? loyaltyRanks[0];
}

export async function getNextRank() {
  const currentIndex = loyaltyRanks.findIndex((rank) => rank.name === mockUser.currentRank);
  return loyaltyRanks[Math.min(currentIndex + 1, loyaltyRanks.length - 1)];
}

export async function getLeaderboard() {
  return mockLeaderboard;
}
