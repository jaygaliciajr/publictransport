import { colors } from "@/constants/colors";
import { ReactNode } from "react";
import { ScrollView, ScrollViewProps, useWindowDimensions, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PassengerBottomNav } from "./passenger-bottom-nav";

export function AppShell({
  children,
  padded = true,
  style,
  bottomInset = 118,
  keyboardShouldPersistTaps,
  showBottomNav = false,
}: {
  children: ReactNode;
  padded?: boolean;
  style?: ViewStyle;
  bottomInset?: number;
  keyboardShouldPersistTaps?: ScrollViewProps["keyboardShouldPersistTaps"];
  showBottomNav?: boolean;
}) {
  const { width, height } = useWindowDimensions();
  const sideInset = padded ? 18 : 0;
  const phoneWidth = width >= 360 ? width - sideInset * 5 : width - sideInset * 2;
  const contentWidth = Math.max(0, Math.min(phoneWidth, 520));

  return (
    <SafeAreaView style={{ flex: 1, height, position: "relative", backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        contentContainerStyle={[
          {
            paddingTop: padded ? 12 : 0,
            paddingBottom: bottomInset,
            flexGrow: 1,
          },
        ]}
      >
        <View
          style={[
            {
              width: contentWidth,
              alignSelf: "center",
              gap: 18,
            },
            style,
          ]}
        >
          {children}
        </View>
      </ScrollView>
      {showBottomNav ? <PassengerBottomNav /> : null}
    </SafeAreaView>
  );
}
