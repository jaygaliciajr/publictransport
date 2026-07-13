export async function purchasePoints(amountPhp: number, method: "GCash" | "Maya") {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (amountPhp <= 0) throw new Error("Choose an amount to continue.");
  return {
    id: `pay-${Date.now()}`,
    method,
    points: amountPhp,
    status: "Pending",
  };
}
