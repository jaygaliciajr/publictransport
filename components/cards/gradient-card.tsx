import { gradients } from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export function GradientCard({
  children,
  colors = gradients.brand,
  style,
}: {
  children: ReactNode;
  colors?: readonly [string, string];
  style?: ViewStyle;
}) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          padding: 20,
          borderRadius: 28,
          borderCurve: "continuous",
          boxShadow: "0 16px 34px rgba(40, 189, 191, 0.22)",
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
}
