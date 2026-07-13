import { AppShell } from "@/components/navigation/app-shell";
import { ScreenHeader } from "@/components/navigation/screen-header";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ErrorState, SuccessState } from "@/components/ui/state-views";
import { TextField } from "@/components/ui/text-field";
import { registerWithUsername } from "@/lib/mockAuth";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit() {
    setError("");
    setSuccess(false);
    try {
      await registerWithUsername(username, password, confirm);
      setSuccess(true);
      setTimeout(() => router.replace("/home"), 450);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    }
  }

  return (
    <AppShell>
      <ScreenHeader title="Create account" subtitle="Just username and password for now." showBack />
      {error ? <ErrorState title="Could not create account" body={error} /> : null}
      {success ? <SuccessState title="Account ready" body="You can complete your profile later." /> : null}
      <View style={{ gap: 12 }}>
        <TextField label="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
        <TextField label="Password" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />
        <TextField label="Confirm password" value={confirm} onChangeText={setConfirm} secureTextEntry autoCapitalize="none" />
      </View>
      <PrimaryButton label="Create account" onPress={submit} />
    </AppShell>
  );
}
