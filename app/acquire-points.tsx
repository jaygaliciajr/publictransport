import { GlassCard } from "@/components/cards/glass-card";
import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SuccessState, ErrorState } from "@/components/ui/state-views";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { purchasePoints } from "@/lib/mockPayments";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const amounts = [100, 300, 500, 1000];
const methods = ["GCash", "Maya"] as const;

export default function AcquirePointsScreen() {
  const [amount, setAmount] = useState(500);
  const [method, setMethod] = useState<(typeof methods)[number]>("GCash");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setStatus("");
    setError("");
    try {
      const receipt = await purchasePoints(amount, method);
      setStatus(`${receipt.points} points via ${receipt.method}. Mock payment is ${receipt.status.toLowerCase()}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed.");
    }
  }

  return (
    <AppShell>
      <ScreenHeader title="Acquire points" subtitle="Buy points with GCash or Maya. Mock flow only." showBack />
      {status ? <SuccessState title="Payment pending" body={status} /> : null}
      {error ? <ErrorState title="Payment failed" body={error} /> : null}
      <GlassCard style={{ gap: 16 }}>
        <Text style={[typography.h2, { color: colors.dark }]}>Choose amount</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {amounts.map((item) => (
            <Choice key={item} label={`PHP ${item}`} active={amount === item} onPress={() => setAmount(item)} />
          ))}
        </View>
        <Text style={[typography.h2, { color: colors.dark }]}>Payment method</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {methods.map((item) => (
            <Choice key={item} label={item} active={method === item} onPress={() => setMethod(item)} />
          ))}
        </View>
        <View style={{ gap: 6 }}>
          <Summary label="Conversion rate" value="PHP 1 = 1 point" />
          <Summary label="Total points" value={`${amount} points`} />
          <Summary label="Payment total" value={`PHP ${amount}`} />
        </View>
      </GlassCard>
      <PrimaryButton label="Confirm purchase" onPress={submit} />
    </AppShell>
  );
}

function Choice({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <Text style={[typography.small, { overflow: "hidden", paddingHorizontal: 14, paddingVertical: 11, borderRadius: 999, backgroundColor: active ? colors.primary : colors.faint, color: active ? colors.surface : colors.dark }]}>
        {label}
      </Text>
    </Pressable>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
      <Text style={[typography.small, { color: colors.muted }]}>{label}</Text>
      <Text style={[typography.small, { color: colors.dark }]}>{value}</Text>
    </View>
  );
}
