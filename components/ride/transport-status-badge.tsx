import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import type { CapacityStatus, RouteStatus } from "@/types";
import { Text, View } from "react-native";

type Status = RouteStatus | CapacityStatus | "Available" | "Limited" | "Full" | "Delayed" | "Confirmed" | "Searching" | "Arriving" | "In progress" | "Completed";

const statusStyles: Record<string, { bg: string; fg: string; label: string }> = {
  Active: { bg: "#EAFBF1", fg: colors.success, label: "Available" },
  Available: { bg: "#EAFBF1", fg: colors.success, label: "Available" },
  Light: { bg: "#EAFBF1", fg: colors.success, label: "Available" },
  Moderate: { bg: "#FFF7E8", fg: colors.warning, label: "Limited" },
  Limited: { bg: "#FFF7E8", fg: colors.warning, label: "Limited" },
  Full: { bg: "#FEECEC", fg: colors.error, label: "Full" },
  Delayed: { bg: "#FFF7E8", fg: colors.warning, label: "Delayed" },
  Offline: { bg: "#FEECEC", fg: colors.error, label: "Offline" },
  Confirmed: { bg: colors.faint, fg: colors.primary, label: "Confirmed" },
  Searching: { bg: colors.faintBlue, fg: colors.info, label: "Searching" },
  Arriving: { bg: colors.faint, fg: colors.primary, label: "Arriving" },
  "In progress": { bg: colors.faintBlue, fg: colors.info, label: "In progress" },
  Completed: { bg: "#EAFBF1", fg: colors.success, label: "Completed" },
};

export function TransportStatusBadge({ status }: { status: Status }) {
  const style = statusStyles[status] ?? statusStyles.Available;

  return (
    <View
      style={{
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: style.bg,
      }}
    >
      <Text style={[typography.small, { color: style.fg, fontWeight: "800" }]}>{style.label}</Text>
    </View>
  );
}
