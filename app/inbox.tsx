import { GlassCard } from "@/components/cards/glass-card";
import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { EmptyState } from "@/components/ui/state-views";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockNotifications } from "@/data/mockLeaderboard";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";

export default function InboxScreen() {
  return (
    <AppShell>
      <ScreenHeader title="Inbox" subtitle="Ride updates, points, loyalty, and advisories." showBack />
      {mockNotifications.length ? mockNotifications.map((item) => (
        <GlassCard key={item.id} style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
          <View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: item.unread ? colors.faint : "#F1F5F9", alignItems: "center", justifyContent: "center" }}>
            <Feather name={iconFor(item.type)} size={18} color={item.unread ? colors.primary : colors.muted} />
          </View>
          <View style={{ flex: 1, gap: 5 }}>
            <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{item.title}</Text>
            <Text style={[typography.small, { color: colors.muted }]}>{item.body}</Text>
            <Text style={[typography.small, { color: colors.primary }]}>{item.date}</Text>
          </View>
        </GlassCard>
      )) : <EmptyState title="No notifications" body="Ride updates and service advisories will appear here." />}
    </AppShell>
  );
}

function iconFor(type: string): keyof typeof Feather.glyphMap {
  if (type === "points") return "credit-card";
  if (type === "loyalty") return "award";
  if (type === "route") return "map";
  if (type === "system") return "bell";
  return "navigation";
}
