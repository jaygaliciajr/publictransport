import { mockPointTransactions } from "@/data/mockHistory";
import { mockUser } from "@/data/mockUser";

export async function getWalletSummary() {
  return {
    balance: mockUser.currentPoints,
    earned: 328,
    purchased: 900,
    transactions: mockPointTransactions,
  };
}

export async function sendPoints(recipient: string, amount: number, note?: string) {
  if (!recipient.trim()) throw new Error("Recipient name or passenger ID is required.");
  if (amount > mockUser.currentPoints) throw new Error("Not enough points.");
  return {
    id: `send-${Date.now()}`,
    recipient,
    amount,
    note,
    status: "Success",
  };
}
