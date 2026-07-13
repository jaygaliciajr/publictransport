import { AppHeader } from "@/components/ride/app-header";
import { FeaturePill } from "@/components/ride/feature-pill";
import { AppShell } from "@/components/navigation/app-shell";
import { RouteCard } from "@/components/routes/route-card";
import { SearchBar } from "@/components/ui/search-bar";
import { EmptyState } from "@/components/ui/state-views";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { mockRoutes } from "@/data/mockRoutes";
import { mockUser } from "@/data/mockUser";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const filters = ["All", "Available", "Limited", "Delayed", "Full"] as const;

export default function RoutesScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const routes = useMemo(() => {
    return mockRoutes.filter((route) => {
      const haystack = `${route.name} ${route.origin} ${route.destination} ${route.stops.map((stop) => stop.name).join(" ")}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      const availability = route.status === "Active" ? (route.activeBuses <= 3 ? "Limited" : "Available") : route.status;
      const matchesFilter = filter === "All" || filter === availability;
      return matchesQuery && matchesFilter;
    });
  }, [filter, query]);

  return (
    <AppShell keyboardShouldPersistTaps="handled" showBottomNav>
        <AppHeader
          title="Routes"
          subtitle="Find routes, fares, ETAs, and stops."
          avatarUrl={mockUser.avatarUrl}
          onProfilePress={() => router.push("/menu")}
        />
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search routes or stops" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 9 }}>
          {filters.map((item) => (
            <Pressable key={item} accessibilityRole="button" onPress={() => setFilter(item)}>
              {({ pressed }) => (
                <View
                  style={{
                    minHeight: 40,
                    paddingHorizontal: 14,
                    borderRadius: 999,
                    backgroundColor: filter === item ? colors.dark : colors.surface,
                    borderWidth: 1,
                    borderColor: filter === item ? colors.dark : colors.line,
                    justifyContent: "center",
                    opacity: pressed ? 0.72 : 1,
                  }}
                >
                  <Text style={[typography.small, { color: filter === item ? colors.surface : colors.dark }]}>{item}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </ScrollView>

        <View
          style={{
            padding: 16,
            borderRadius: 26,
            borderCurve: "continuous",
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.line,
            gap: 12,
          }}
        >
          <Text style={[typography.h2, { color: colors.dark }]}>Route status</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9 }}>
            <FeaturePill icon="map-pin" label={`${mockRoutes.length} routes`} />
            <FeaturePill icon="navigation" label="Live ETA" tone="blue" />
            <FeaturePill icon="users" label="Capacity status" tone="success" />
          </View>
        </View>

        <View style={{ gap: 12 }}>
          <Text style={[typography.h2, { color: colors.dark }]}>Routes near you</Text>
          {routes.length ? (
            routes.map((route) => <RouteCard key={route.id} route={route} />)
          ) : (
            <EmptyState title="No routes nearby" body="Try another stop or destination." />
          )}
        </View>
    </AppShell>
  );
}
