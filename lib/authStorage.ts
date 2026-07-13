import * as SecureStore from "expo-secure-store";

export interface ReturningUser {
  userId: string;
  firstName: string;
  maskedEmail: string;
  avatarUrl?: string;
  initials: string;
  biometricsEnabled: boolean;
}

const RETURNING_USER_KEY = "puti_returning_user";

export function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function buildMaskedEmail(username: string): string {
  const visible = username.slice(0, 2);
  return `${visible}***@puti.app`;
}

export async function saveReturningUser(user: ReturningUser): Promise<void> {
  await SecureStore.setItemAsync(RETURNING_USER_KEY, JSON.stringify(user));
}

export async function getReturningUser(): Promise<ReturningUser | null> {
  try {
    const data = await SecureStore.getItemAsync(RETURNING_USER_KEY);
    return data ? (JSON.parse(data) as ReturningUser) : null;
  } catch {
    return null;
  }
}

export async function clearReturningUser(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(RETURNING_USER_KEY);
  } catch {
    // key may not exist yet — safe to ignore
  }
}
