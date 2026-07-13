import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { Text, TextInput, View } from "react-native";

type Props = {
  pickup: string;
  destination: string;
  onChangePickup?: (value: string) => void;
  onChangeDestination?: (value: string) => void;
  compact?: boolean;
};

export function LocationSearchInput({ pickup, destination, onChangePickup, onChangeDestination, compact }: Props) {
  return (
    <View
      style={{
        borderRadius: 24,
        borderCurve: "continuous",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        padding: compact ? 12 : 14,
        gap: 12,
        boxShadow: "0 14px 30px rgba(16, 24, 40, 0.08)",
      }}
    >
      <LocationRow
        icon="navigation"
        label="Pickup"
        value={pickup}
        placeholder="Detect current location"
        color={colors.primary}
        onChangeText={onChangePickup}
      />
      <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 35 }} />
      <LocationRow
        icon="search"
        label="Destination"
        value={destination}
        placeholder="Where to?"
        color={colors.secondary}
        onChangeText={onChangeDestination}
      />
    </View>
  );
}

function LocationRow({
  icon,
  label,
  value,
  placeholder,
  color,
  onChangeText,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
  placeholder: string;
  color: string;
  onChangeText?: (value: string) => void;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 11 }}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: `${color}18`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather name={icon} size={13} color={color} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[typography.small, { color: colors.muted }]}>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.softMuted}
          style={[typography.body, { color: colors.dark, padding: 0, fontWeight: "700" }]}
          returnKeyType="search"
        />
      </View>
    </View>
  );
}
