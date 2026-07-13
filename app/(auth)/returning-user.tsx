import { AuthFallbackActions } from "@/components/ui/auth-fallback-actions";
import { BiometricUnlockButton } from "@/components/ui/biometric-unlock-button";
import { GuestRouteAccessLink } from "@/components/ui/guest-route-access-link";
import { PasswordUnlockForm } from "@/components/ui/password-unlock-form";
import { SavedUserIdentityCard } from "@/components/ui/saved-user-identity-card";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { colors, gradients } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { clearReturningUser, getReturningUser, ReturningUser } from "@/lib/authStorage";
import {
  biometricLogin,
  BiometricAvailability,
  checkBiometricAvailability,
  loginWithUsername,
} from "@/lib/mockAuth";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AuthMode = "biometric" | "password";

const MAX_BIOMETRIC_ATTEMPTS = 3;

export default function ReturningUnlockScreen() {
  const insets = useSafeAreaInsets();

  const [checking, setChecking] = useState(true);
  const [returningUser, setReturningUser] = useState<ReturningUser | null>(null);
  const [bioInfo, setBioInfo] = useState<BiometricAvailability | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("biometric");
  const [biometricLoading, setBiometricLoading] = useState(false);
  const [biometricError, setBiometricError] = useState("");
  const biometricAttempts = useRef(0);

  useEffect(() => {
    async function init() {
      const [user, bio] = await Promise.all([
        getReturningUser(),
        checkBiometricAvailability(),
      ]);

      if (!user) {
        // No saved user — shouldn't normally reach here; fall back to full login
        router.replace("/welcome");
        return;
      }

      setReturningUser(user);
      setBioInfo(bio);
      setAuthMode(user.biometricsEnabled && bio.available ? "biometric" : "password");
      setChecking(false);
    }
    init();
  }, []);

  // Auto-trigger biometric prompt shortly after mount
  useEffect(() => {
    if (checking || authMode !== "biometric") return;
    const timer = setTimeout(triggerBiometric, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checking, authMode]);

  async function triggerBiometric() {
    if (biometricLoading) return;
    setBiometricError("");
    setBiometricLoading(true);
    try {
      await biometricLogin();
      router.replace("/home");
    } catch (err) {
      const code = (err as { biometricError?: string }).biometricError ?? "failed";
      biometricAttempts.current += 1;

      if (biometricAttempts.current >= MAX_BIOMETRIC_ATTEMPTS) {
        setAuthMode("password");
        setBiometricError("For your security, please enter your password.");
      } else if (code === "user_cancel") {
        setBiometricError("Unlock cancelled. You can try again or use your password.");
      } else {
        setBiometricError("We couldn't verify you. Please try again.");
      }
    } finally {
      setBiometricLoading(false);
    }
  }

  async function handlePasswordSubmit(password: string) {
    if (!returningUser) throw new Error("No saved user.");
    // Mock: any non-empty password succeeds — replace with real auth when backend is ready
    await loginWithUsername(returningUser.userId, password);
    router.replace("/home");
  }

  async function handleSwitchAccount() {
    await clearReturningUser();
    router.replace("/login");
  }

  if (checking) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <StatusBar barStyle="dark-content" />
        <LinearGradient
          colors={gradients.brand}
          style={{ width: 72, height: 72, borderRadius: 22, alignItems: "center", justifyContent: "center" }}
        >
          <Feather name="zap" size={32} color={colors.surface} />
        </LinearGradient>
        <ActivityIndicator color={colors.primary} size="small" />
      </View>
    );
  }

  if (!returningUser) return null;

  const showBiometricFlow = authMode === "biometric" && !!bioInfo?.available;
  const canEnableBiometrics = authMode === "password" && !!bioInfo?.available && !returningUser.biometricsEnabled;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        backgroundColor={colors.background}
      />

      {/* Branded gradient header */}
      <LinearGradient
        colors={gradients.soft}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 24,
          paddingBottom: 32,
          alignItems: "center",
          gap: 12,
        }}
      >
        <LinearGradient
          colors={gradients.brand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 72,
            height: 72,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 20px rgba(40, 189, 191, 0.28)",
          }}
        >
          <Feather name="zap" size={32} color={colors.surface} />
        </LinearGradient>
        <Text style={[typography.h3, { color: colors.ink, letterSpacing: 2 }]}>PUTI</Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 28,
          paddingBottom: insets.bottom + 32,
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Greeting */}
        <View style={{ gap: 6 }}>
          <Text style={[typography.h1, { color: colors.dark }]}>
            Welcome back, {returningUser.firstName}
          </Text>
          <Text style={[typography.body, { color: colors.muted }]}>
            {showBiometricFlow
              ? "Unlock your account to continue your ride."
              : "Enter your password to continue."}
          </Text>
        </View>

        {/* Identity card */}
        <SavedUserIdentityCard
          firstName={returningUser.firstName}
          maskedEmail={returningUser.maskedEmail}
          avatarUrl={returningUser.avatarUrl}
          initials={returningUser.initials}
        />

        {/* Unlock action */}
        {showBiometricFlow ? (
          <View style={{ gap: 14 }}>
            <BiometricUnlockButton
              hasFaceId={!!bioInfo?.hasFaceId}
              loading={biometricLoading}
              onPress={triggerBiometric}
            />

            {biometricError ? (
              <View
                style={{
                  backgroundColor: colors.faint,
                  borderRadius: 14,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: colors.line,
                }}
              >
                <Text
                  style={[typography.small, { color: colors.ink, textAlign: "center" }]}
                >
                  {biometricError}
                </Text>
              </View>
            ) : null}

            <SecondaryButton
              label="Use password instead"
              icon="lock"
              onPress={() => {
                setBiometricError("");
                setAuthMode("password");
              }}
            />
          </View>
        ) : (
          <PasswordUnlockForm
            onSubmit={handlePasswordSubmit}
            error={biometricError}
            showBiometricPrompt={canEnableBiometrics}
            // TODO: wire enable-biometrics toggle to update ReturningUser in storage
            onEnableBiometrics={() => {}}
          />
        )}

        {/* Switch account */}
        <AuthFallbackActions
          firstName={returningUser.firstName}
          onSwitchAccount={handleSwitchAccount}
        />

        {/* Separator */}
        <View style={{ height: 1, backgroundColor: colors.line }} />

        {/* Guest CTA */}
        <GuestRouteAccessLink />
      </ScrollView>
    </View>
  );
}
