import { buildMaskedEmail, getInitials, saveReturningUser } from "@/lib/authStorage";
import { mockUser } from "@/data/mockUser";
import * as LocalAuthentication from "expo-local-authentication";

export type BiometricAvailability = {
  hasHardware: boolean;
  isEnrolled: boolean;
  available: boolean;
  hasFaceId: boolean;
};

export async function checkBiometricAvailability(): Promise<BiometricAvailability> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const hasFaceId = supportedTypes.includes(
    LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
  );
  return { hasHardware, isEnrolled, available: hasHardware && isEnrolled, hasFaceId };
}

export async function loginWithUsername(username: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 350));
  if (!username || !password) {
    throw new Error("Please enter your username and password.");
  }
  await persistReturningUser(username);
  return mockUser;
}

export async function registerWithUsername(
  username: string,
  password: string,
  confirmPassword: string
) {
  await new Promise((resolve) => setTimeout(resolve, 350));
  if (!username) throw new Error("Username is required.");
  if (password.length < 6) throw new Error("Use at least 6 characters.");
  if (password !== confirmPassword) throw new Error("Passwords do not match.");
  const user = { ...mockUser, username };
  await persistReturningUser(username);
  return user;
}

export async function biometricLogin() {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Unlock your PUTI account",
    cancelLabel: "Cancel",
    disableDeviceFallback: false,
  });
  if (!result.success) {
    const code = (result as { error?: string }).error ?? "unknown";
    const err = new Error(code) as Error & { biometricError: string };
    err.biometricError = code;
    throw err;
  }
  await persistReturningUser(mockUser.username);
  return mockUser;
}

async function persistReturningUser(username: string) {
  await saveReturningUser({
    userId: mockUser.id,
    firstName: mockUser.fullName.split(" ")[0],
    maskedEmail: buildMaskedEmail(username),
    avatarUrl: mockUser.avatarUrl,
    initials: getInitials(mockUser.fullName),
    biometricsEnabled: mockUser.biometricEnabled,
  });
}
