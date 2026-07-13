import { colors } from "@/constants/colors";
import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export function GlassCard({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[
        {
          padding: 18,
          borderRadius: 24,
          borderCurve: "continuous",
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.line,
          boxShadow: "0 14px 30px rgba(16, 24, 40, 0.07)",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
