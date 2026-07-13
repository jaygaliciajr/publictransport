import { PrimaryButton } from "@/components/ui/primary-button";
import { TextField } from "@/components/ui/text-field";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  onSubmit: (password: string) => Promise<void>;
  error?: string;
  showBiometricPrompt?: boolean;
  onEnableBiometrics?: () => void;
};

export function PasswordUnlockForm({ onSubmit, error, showBiometricPrompt, onEnableBiometrics }: Props) {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  async function handleSubmit() {
    if (!password) return;
    setLocalError("");
    setSubmitting(true);
    try {
      await onSubmit(password);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Incorrect password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const displayError = localError || error;

  return (
    <View style={{ gap: 14 }}>
      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholder="Enter your password"
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

      {displayError ? (
        <Text style={[typography.small, { color: colors.error, textAlign: "center" }]}>
          {displayError}
        </Text>
      ) : null}

      <PrimaryButton
        label={submitting ? "Checking…" : "Continue"}
        onPress={handleSubmit}
        disabled={submitting || !password}
      />

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/forgot-password" as any)}
        style={{ alignItems: "center", paddingVertical: 4 }}
      >
        <Text style={[typography.small, { color: colors.primary }]}>Forgot password?</Text>
      </Pressable>

      {showBiometricPrompt && onEnableBiometrics && (
        <Pressable
          accessibilityRole="button"
          onPress={onEnableBiometrics}
          style={{ alignItems: "center", paddingVertical: 4 }}
        >
          <Text style={[typography.small, { color: colors.muted }]}>
            Enable biometric unlock next time
          </Text>
        </Pressable>
      )}
    </View>
  );
}
