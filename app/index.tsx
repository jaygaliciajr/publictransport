import { GradientCard } from "@/components/cards/gradient-card";
import { AppShell } from "@/components/navigation/app-shell";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { getReturningUser } from "@/lib/authStorage";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const returningUser = await getReturningUser();
      if (returningUser) {
        router.replace("/returning-user");
      } else {
        router.replace("/welcome");
      }
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppShell style={{ flexGrow: 1, justifyContent: "center" }}>
      <View style={{ alignItems: "center", gap: 18 }}>
        <GradientCard style={{ width: 122, height: 122, alignItems: "center", justifyContent: "center", borderRadius: 40 }}>
          <Feather name="zap" size={52} color={colors.surface} />
        </GradientCard>
        <View style={{ alignItems: "center", gap: 8 }}>
          <Text style={[typography.title, { color: colors.dark }]}>PUTI</Text>
          <Text style={[typography.body, { color: colors.muted, textAlign: "center" }]}>
            Ride cleaner. Travel smarter.
          </Text>
        </View>
      </View>
    </AppShell>
  );
}
