export type RouteStatus = "Active" | "Delayed" | "Offline";
export type CapacityStatus = "Light" | "Moderate" | "Full";
export type RideStatus = "Completed" | "Cancelled" | "Active";
export type PointTransactionType = "earned" | "purchased" | "spent" | "sent" | "received" | "converted";

export interface User {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  passengerId: string;
  currentPoints: number;
  loyaltyPoints: number;
  currentRank: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
  co2SavedKg: number;
  biometricEnabled: boolean;
}

export interface Stop {
  id: string;
  name: string;
  order: number;
  eta: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  stops: Stop[];
  estimatedTime: string;
  farePoints: number;
  activeBuses: number;
  nextBusEta: string;
  status: RouteStatus;
}

export interface Bus {
  id: string;
  plateNumber: string;
  routeId: string;
  currentStop: string;
  nextStop: string;
  etaMinutes: number;
  capacityStatus: CapacityStatus;
  hasWifi: boolean;
  hasCctv: boolean;
  isElectric: boolean;
}

export interface PointTransaction {
  id: string;
  type: PointTransactionType;
  amount: number;
  date: string;
  status: "Success" | "Pending" | "Failed";
  description: string;
}

export interface RideHistory {
  id: string;
  routeName: string;
  busId: string;
  date: string;
  pointsSpent: number;
  pointsEarned: number;
  co2SavedKg: number;
  status: RideStatus;
}

export interface LoyaltyRank {
  id: string;
  name: User["currentRank"];
  theme: string;
  minPoints: number;
  maxPoints: number;
  badge: string;
  plantStage: string;
  gradient: readonly [string, string];
  benefits: string[];
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatarUrl: string;
  rank: User["currentRank"];
  ridesCount: number;
  loyaltyPoints: number;
  co2SavedKg: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: "ride" | "points" | "loyalty" | "route" | "system";
  date: string;
  unread: boolean;
}
