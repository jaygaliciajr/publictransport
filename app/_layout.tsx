import { colors } from "@/constants/colors";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export {
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="routes/[id]" />
      <Stack.Screen name="qr" />
      <Stack.Screen name="history" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="security" />
      <Stack.Screen name="menu" />
      <Stack.Screen name="inbox" />
      <Stack.Screen name="ranking" />
      <Stack.Screen name="send-points" />
      <Stack.Screen name="acquire-points" />
      <Stack.Screen name="help" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
