import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { ErrorState } from "@/components/ui/state-views";
import { TextField } from "@/components/ui/text-field";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { loginWithUsername } from "@/lib/mockAuth";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("mika");
  const [password, setPassword] = useState("pass123");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    try {
      await loginWithUsername(username, password);
      router.replace("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    }
  }

  return (
    <AppShell>
      <ScreenHeader title="Log in" subtitle="Use your username, social account, or biometrics." showBack />
      {error ? <ErrorState title="Login failed" body={error} /> : null}
      <View style={{ gap: 12 }}>
        <TextField label="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
        <TextField label="Password" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />
      </View>
      <PrimaryButton label="Log in" onPress={handleLogin} />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <SocialButton icon="chrome" label="Google" />
        <SocialButton icon="facebook" label="Facebook" />
        <SocialButton icon="smartphone" label="Apple" />
      </View>
      <SecondaryButton label="Biometric login" onPress={() => router.replace("/home")} />
      <SecondaryButton label="View routes without logging in" onPress={() => router.push("/route-preview")} />
    </AppShell>
  );
}

function SocialButton({ icon, label }: { icon: keyof typeof Feather.glyphMap; label: string }) {
  return (
    <View
      style={{
        flex: 1,
        minHeight: 54,
        borderRadius: 18,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Feather name={icon} size={19} color={colors.dark} />
      <Text style={[typography.small, { color: colors.dark }]}>{label}</Text>
    </View>
  );
}
