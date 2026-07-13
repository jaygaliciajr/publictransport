import { GlassCard } from "@/components/cards/glass-card";
import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockUser } from "@/data/mockUser";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { Switch, Text, View } from "react-native";

export default function SecurityScreen() {
  const [biometrics, setBiometrics] = useState(mockUser.biometricEnabled);
  return (
    <AppShell>
      <ScreenHeader title="Security" subtitle="Simple controls for safer commuting." showBack />
      <SecurityItem icon="lock" title="Change password" body="Update your account password." />
      <GlassCard style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Feather name="smartphone" size={20} color={colors.primary} />
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>Biometric login</Text>
          <Text style={[typography.small, { color: colors.muted }]}>Use face or fingerprint when available.</Text>
        </View>
        <Switch value={biometrics} onValueChange={setBiometrics} trackColor={{ true: colors.primary, false: colors.line }} />
      </GlassCard>
      <SecurityItem icon="monitor" title="Active sessions" body="This phone is currently active. More controls in Phase 2." />
      <SecurityItem icon="shield" title="Privacy controls" body="Location and trip privacy settings placeholder." />
    </AppShell>
  );
}

function SecurityItem({ icon, title, body }: { icon: keyof typeof Feather.glyphMap; title: string; body: string }) {
  return (
    <GlassCard style={{ flexDirection: "row", gap: 12 }}>
      <Feather name={icon} size={20} color={colors.primary} />
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{title}</Text>
        <Text style={[typography.small, { color: colors.muted }]}>{body}</Text>
      </View>
    </GlassCard>
  );
}
