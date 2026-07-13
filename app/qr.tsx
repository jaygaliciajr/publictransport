import { QRCard } from "@/components/points/qr-card";
import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockUser } from "@/data/mockUser";
import { Text, View } from "react-native";

export default function QRScreen() {
  return (
    <AppShell>
      <ScreenHeader title="QR check-in" subtitle="For bus scanning and ride payment validation." showBack />
      <QRCard user={mockUser} />
      <View style={{ gap: 10 }}>
        <PrimaryButton label="Refresh QR" />
        <SecondaryButton label="Use offline mode" />
      </View>
      <Text style={[typography.small, { color: colors.muted, textAlign: "center" }]}>
        Demo states prepared: QR active, QR expired, insufficient points, and offline unavailable.
      </Text>
    </AppShell>
  );
}
