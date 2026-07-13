import { GlassCard } from "@/components/cards/glass-card";
import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ErrorState, SuccessState } from "@/components/ui/state-views";
import { TextField } from "@/components/ui/text-field";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockUser } from "@/data/mockUser";
import { sendPoints } from "@/services/pointService";
import { useState } from "react";
import { Text } from "react-native";

export default function SendPointsScreen() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("100");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function submit() {
    setError("");
    setSuccess("");
    try {
      const receipt = await sendPoints(recipient, Number(amount), note);
      setSuccess(`Sent ${receipt.amount} points to ${receipt.recipient}. Receipt ${receipt.id}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transfer failed.");
    }
  }

  return (
    <AppShell>
      <ScreenHeader title="Send points" subtitle={`Available balance: ${mockUser.currentPoints} points`} showBack />
      {error ? <ErrorState title="Could not send points" body={error} /> : null}
      {success ? <SuccessState title="Transfer complete" body={success} /> : null}
      <GlassCard style={{ gap: 12 }}>
        <TextField label="Recipient name or passenger ID" value={recipient} onChangeText={setRecipient} />
        <TextField label="Points amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
        <TextField label="Optional note" value={note} onChangeText={setNote} />
        <Text style={[typography.small, { color: colors.muted }]}>Confirmation screen and recipient lookup are mocked for Phase 1.</Text>
      </GlassCard>
      <PrimaryButton label="Review and send" onPress={submit} />
    </AppShell>
  );
}
