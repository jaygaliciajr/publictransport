import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { EmptyState } from "@/components/ui/state-views";

export default function HelpScreen() {
  return (
    <AppShell>
      <ScreenHeader title="Help & Support" showBack />
      <EmptyState title="Support center placeholder" body="FAQs, lost item reports, and service support can connect here in Phase 2." />
    </AppShell>
  );
}
