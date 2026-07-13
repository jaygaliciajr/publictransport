import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { SideMenu } from "@/components/navigation/side-menu";

export default function MenuScreen() {
  return (
    <AppShell>
      <ScreenHeader title="Settings" subtitle="Manage your passenger account." showBack />
      <SideMenu />
    </AppShell>
  );
}
