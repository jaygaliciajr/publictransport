import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { ErrorState } from "@/components/ui/state-views";
import { router } from "expo-router";

export default function NotFoundScreen() {
  return (
    <AppShell>
      <ScreenHeader title="Not found" showBack />
      <ErrorState title="This screen is not available" body="The link may be outdated or still planned for a later phase." />
      <SecondaryButton label="Go home" onPress={() => router.replace("/home")} />
    </AppShell>
  );
}
