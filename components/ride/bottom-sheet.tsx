import { colors } from "@/constants/colors";
import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export function BottomSheet({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[
        {
          padding: 18,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          borderBottomLeftRadius: 26,
          borderBottomRightRadius: 26,
          borderCurve: "continuous",
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.line,
          gap: 16,
          boxShadow: "0 18px 36px rgba(16, 24, 40, 0.11)",
        },
        style,
      ]}
    >
      <View
        style={{
          alignSelf: "center",
          width: 44,
          height: 5,
          borderRadius: 999,
          backgroundColor: colors.lineStrong,
        }}
      />
      {children}
    </View>
  );
}
