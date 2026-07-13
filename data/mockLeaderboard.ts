import type { LeaderboardUser, NotificationItem } from "@/types";

export const mockLeaderboard: LeaderboardUser[] = [
  { id: "lb-1", name: "Ari Cruz", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&q=80", rank: "Diamond", ridesCount: 184, loyaltyPoints: 12840, co2SavedKg: 182.4 },
  { id: "lb-2", name: "Mika Santos", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&q=80", rank: "Gold", ridesCount: 91, loyaltyPoints: 3180, co2SavedKg: 42.8 },
  { id: "lb-3", name: "Jae Ramos", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&q=80", rank: "Platinum", ridesCount: 126, loyaltyPoints: 7480, co2SavedKg: 96.2 },
  { id: "lb-4", name: "Tala Reyes", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&q=80", rank: "Silver", ridesCount: 72, loyaltyPoints: 2240, co2SavedKg: 31.1 },
  { id: "lb-5", name: "Noel Lim", avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=240&q=80", rank: "Bronze", ridesCount: 54, loyaltyPoints: 970, co2SavedKg: 21.5 },
];

export const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Nearest bus arriving soon",
    body: "E-MINI 101 reaches Robinsons Dasmarinas in 4 minutes.",
    type: "ride",
    date: "Today",
    unread: true,
  },
  {
    id: "n2",
    title: "Points purchase completed",
    body: "Your 500 ride points are now ready.",
    type: "points",
    date: "Yesterday",
    unread: false,
  },
  {
    id: "n3",
    title: "Route advisory",
    body: "Bacoor Coastal Connector is delayed due to coastal traffic.",
    type: "route",
    date: "Yesterday",
    unread: true,
  },
];
