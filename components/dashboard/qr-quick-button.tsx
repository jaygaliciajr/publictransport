import { colors } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, View } from "react-native";

export function QRQuickButton({ onPress, unavailable }: { onPress?: () => void; unavailable?: boolean }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={unavailable ? "QR unavailable" : "Open QR code"} disabled={unavailable} onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{
            width: 62,
            height: 62,
            borderRadius: 31,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.surface,
            opacity: unavailable ? 0.5 : pressed ? 0.72 : 1,
            boxShadow: "0 12px 24px rgba(15, 23, 42, 0.11)",
          }}
        >
          <Feather name="grid" size={28} color={colors.primary} />
        </View>
      )}
    </Pressable>
  );
}
