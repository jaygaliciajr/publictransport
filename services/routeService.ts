import { mockBuses } from "@/data/mockBuses";
import { mockRoutes } from "@/data/mockRoutes";

export async function listRoutes() {
  return mockRoutes;
}

export async function getRouteById(id: string) {
  return mockRoutes.find((route) => route.id === id) ?? null;
}

export async function listActiveBuses(routeId?: string) {
  return routeId ? mockBuses.filter((bus) => bus.routeId === routeId) : mockBuses;
}
