import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { EmptyState } from "@/components/ui/state-views";

export default function TermsScreen() {
  return (
    <AppShell>
      <ScreenHeader title="Terms & Privacy" showBack />
      <EmptyState title="Terms placeholder" body="Add final terms, privacy, data retention, and fare policy copy before launch." />
    </AppShell>
  );
}
