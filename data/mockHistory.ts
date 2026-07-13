import type { PointTransaction, RideHistory } from "@/types";

export const mockHistory: RideHistory[] = [
  {
    id: "ride-1",
    routeName: "Dasmarinas Loop",
    busId: "E-MINI 101",
    date: "2026-04-26T08:20:00+08:00",
    pointsSpent: 24,
    pointsEarned: 18,
    co2SavedKg: 1.4,
    status: "Completed",
  },
  {
    id: "ride-2",
    routeName: "Imus - Alabang Express",
    busId: "E-MINI 204",
    date: "2026-04-25T18:05:00+08:00",
    pointsSpent: 58,
    pointsEarned: 36,
    co2SavedKg: 3.2,
    status: "Completed",
  },
  {
    id: "ride-3",
    routeName: "Bacoor Coastal Connector",
    busId: "E-MINI 309",
    date: "2026-04-24T07:42:00+08:00",
    pointsSpent: 42,
    pointsEarned: 27,
    co2SavedKg: 2.1,
    status: "Completed",
  },
];

export const mockPointTransactions: PointTransaction[] = [
  {
    id: "pt-1",
    type: "earned",
    amount: 18,
    date: "2026-04-26T08:48:00+08:00",
    status: "Success",
    description: "Loyalty points from Dasmarinas Loop",
  },
  {
    id: "pt-2",
    type: "purchased",
    amount: 500,
    date: "2026-04-25T16:13:00+08:00",
    status: "Success",
    description: "Bought points with GCash",
  },
  {
    id: "pt-3",
    type: "spent",
    amount: -58,
    date: "2026-04-25T18:05:00+08:00",
    status: "Success",
    description: "Fare payment for Imus - Alabang Express",
  },
];
