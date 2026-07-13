import { AppHeader } from "@/components/ride/app-header";
import { AppShell } from "@/components/navigation/app-shell";
import { PaymentMethodCard } from "@/components/ride/payment-method-card";
import { ProfileCard } from "@/components/ride/profile-card";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockUser } from "@/data/mockUser";
import Feather from "@expo/vector-icons/Feather";
import { Link, router } from "expo-router";
import { Pressable, Switch, Text, View } from "react-native";

type SettingsItem = {
  label: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  href?: string;
};

type SettingsSection = {
  title: string;
  items: SettingsItem[];
};

const sections: SettingsSection[] = [
  {
    title: "Account",
    items: [
      { label: "Profile", description: "Passenger details and identity", icon: "user", href: "/profile" },
      { label: "Saved Places", description: "Home, work, and frequent stops", icon: "map-pin" },
      { label: "Notifications", description: "ETA, reservation, and wallet alerts", icon: "bell" },
    ],
  },
  {
    title: "Ride Preferences",
    items: [
      { label: "Preferred route", description: "Prioritize your regular commute", icon: "git-branch", href: "/routes" },
      { label: "Accessibility needs", description: "Assistance and boarding notes", icon: "heart" },
      { label: "Language", description: "English", icon: "globe" },
    ],
  },
  {
    title: "Safety",
    items: [
      { label: "Emergency contact", description: "Trusted contact for active trips", icon: "shield", href: "/security" },
      { label: "Trip sharing", description: "Share live ride status", icon: "share-2" },
      { label: "Privacy", description: "Location and data controls", icon: "lock" },
    ],
  },
  {
    title: "App",
    items: [
      { label: "Help Center", description: "Support and trip questions", icon: "help-circle", href: "/help" },
      { label: "Terms", description: "Terms and privacy policy", icon: "file-text", href: "/terms" },
      { label: "About", description: "PUTI passenger app", icon: "info" },
    ],
  },
];

export default function SettingsScreen() {
  return (
    <AppShell showBottomNav>
        <AppHeader title="Settings" subtitle="Account, payment, safety." avatarUrl={mockUser.avatarUrl} onProfilePress={() => router.push("/menu")} />
        <ProfileCard user={mockUser} />

        <View style={{ gap: 12 }}>
          <SectionTitle title="Payment" />
          <PaymentMethodCard title="Cashless payment ready" description={`${mockUser.currentPoints} points available`} icon="credit-card" active />
          <PaymentMethodCard title="GCash / card" description="Coming soon" icon="smartphone" />
          <SettingsRow label="Transaction history" description="View rides, points, and receipts" icon="clock" href="/history" />
        </View>

        {sections.map((section) => (
          <View key={section.title} style={{ gap: 12 }}>
            <SectionTitle title={section.title} />
            <View
              style={{
                borderRadius: 26,
                borderCurve: "continuous",
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.line,
                overflow: "hidden",
                boxShadow: "0 14px 30px rgba(16, 24, 40, 0.07)",
              }}
            >
              {section.items.map((item, index) => (
                <SettingsRow
                  key={item.label}
                  label={item.label}
                  description={item.description}
                  icon={item.icon}
                  href={item.href}
                  showDivider={index < section.items.length - 1}
                />
              ))}
            </View>
          </View>
        ))}

        <View
          style={{
            padding: 16,
            borderRadius: 24,
            borderCurve: "continuous",
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.line,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Feather name="shield" size={20} color={colors.primary} />
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>Biometric security</Text>
            <Text style={[typography.small, { color: colors.muted }]}>Use device security for wallet actions.</Text>
          </View>
          <Switch value={mockUser.biometricEnabled} trackColor={{ true: colors.faint, false: colors.line }} thumbColor={colors.primary} />
        </View>
    </AppShell>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={[typography.h2, { color: colors.dark }]}>{title}</Text>;
}

function SettingsRow({
  label,
  description,
  icon,
  href,
  showDivider,
}: {
  label: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  href?: string;
  showDivider?: boolean;
}) {
  const content = ({ pressed = false }: { pressed?: boolean }) => (
    <View
      style={{
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        opacity: pressed ? 0.68 : 1,
        borderBottomWidth: showDivider ? 1 : 0,
        borderBottomColor: colors.line,
      }}
    >
      <View style={{ width: 40, height: 40, borderRadius: 15, borderCurve: "continuous", backgroundColor: colors.faint, alignItems: "center", justifyContent: "center" }}>
        <Feather name={icon} size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{label}</Text>
        <Text style={[typography.small, { color: colors.muted }]}>{description}</Text>
      </View>
      <Feather name="chevron-right" size={18} color={colors.softMuted} />
    </View>
  );

  if (href) {
    return (
      <Link href={href as never} asChild>
        <Pressable accessibilityRole="button" accessibilityLabel={label}>{content}</Pressable>
      </Link>
    );
  }

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={() => router.push("/menu")}>
      {content}
    </Pressable>
  );
}
