import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { RouteCard } from "@/components/routes/route-card";
import { SearchBar } from "@/components/ui/search-bar";
import { EmptyState } from "@/components/ui/state-views";
import { mockRoutes } from "@/data/mockRoutes";
import { useState } from "react";

export default function RoutePreviewScreen() {
  const [query, setQuery] = useState("");
  const routes = mockRoutes.filter((route) => `${route.name} ${route.origin} ${route.destination}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <AppShell>
      <ScreenHeader title="Public routes" subtitle="Browse routes without logging in." showBack />
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search route or destination" />
      {routes.length ? routes.map((route) => <RouteCard key={route.id} route={route} publicMode />) : <EmptyState title="No routes found" body="Try another destination or check back later." />}
    </AppShell>
  );
}
