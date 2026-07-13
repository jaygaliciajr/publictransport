import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { formatPoints } from "@/lib/formatters";
import type { User } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";
import { GlassCard } from "../cards/glass-card";

const qrBlocks = [
  [1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1],
  [0, 1, 0, 1, 1, 0, 0, 1, 0],
  [1, 0, 1, 0, 1, 1, 0, 0, 1],
  [0, 1, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1],
];

export function QRCard({ user, state = "active" }: { user: User; state?: "active" | "expired" | "insufficient" | "offline" }) {
  const unavailable = state !== "active";
  return (
    <GlassCard style={{ gap: 18, alignItems: "center" }}>
      <View
        style={{
          width: 230,
          height: 230,
          borderRadius: 28,
          borderCurve: "continuous",
          backgroundColor: unavailable ? "#EEF2F7" : colors.surface,
          padding: 18,
          opacity: unavailable ? 0.42 : 1,
          borderWidth: 1,
          borderColor: colors.line,
        }}
      >
        <View style={{ flex: 1, gap: 5 }}>
          {qrBlocks.map((row, rowIndex) => (
            <View key={rowIndex} style={{ flex: 1, flexDirection: "row", gap: 5 }}>
              {row.map((block, columnIndex) => (
                <View
                  key={`${rowIndex}-${columnIndex}`}
                  style={{
                    flex: 1,
                    borderRadius: 4,
                    backgroundColor: block ? colors.dark : colors.surface,
                  }}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
      <View style={{ alignItems: "center", gap: 4 }}>
        <Text style={[typography.h2, { color: colors.dark }]}>{stateLabel(state)}</Text>
        <Text style={[typography.small, { color: colors.muted }]}>{user.fullName} • {user.passengerId}</Text>
        <Text style={[typography.small, { color: colors.primary }]}>{formatPoints(user.currentPoints)} points available</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Feather name="clock" size={16} color={colors.muted} />
        <Text style={[typography.small, { color: colors.muted }]}>Expires in 02:45</Text>
      </View>
    </GlassCard>
  );
}

function stateLabel(state: "active" | "expired" | "insufficient" | "offline") {
  if (state === "expired") return "QR expired";
  if (state === "insufficient") return "Not enough points";
  if (state === "offline") return "Offline QR unavailable";
  return "Your QR is ready";
}
