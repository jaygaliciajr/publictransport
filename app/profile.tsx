import { GlassCard } from "@/components/cards/glass-card";
import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockUser } from "@/data/mockUser";
import { Image } from "expo-image";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <AppShell>
      <ScreenHeader title="Profile details" subtitle="Complete profile later when backend is ready." showBack />
      <GlassCard style={{ alignItems: "center", gap: 12 }}>
        <Image source={{ uri: mockUser.avatarUrl }} style={{ width: 104, height: 104, borderRadius: 52 }} />
        <Text style={[typography.h1, { color: colors.dark }]}>{mockUser.fullName}</Text>
        <Text style={[typography.small, { color: colors.muted }]}>{mockUser.username} • {mockUser.passengerId}</Text>
      </GlassCard>
      <Info label="Contact number" value="Add later" />
      <Info label="Email" value="Add later" />
      <Info label="Passenger ID" value={mockUser.passengerId} />
      <SecondaryButton label="Edit profile" />
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
      <Text style={[typography.small, { color: colors.muted }]}>{label}</Text>
      <Text style={[typography.small, { color: colors.dark }]}>{value}</Text>
    </GlassCard>
  );
}
