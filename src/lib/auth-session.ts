import { z } from "zod";

export const authSessionStorageKey = "nextjs-starter.auth-session";

export const AuthSessionSchema = z.object({
  userId: z.string().min(1),
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  tokenExpires: z.number().int().positive()
});

export type AuthSession = z.infer<typeof AuthSessionSchema>;

const canUseStorage = (): boolean => typeof window !== "undefined";

export const getStoredAuthSession = (): AuthSession | null => {
  if (!canUseStorage()) {
    return null;
  }

  const storedValue = window.localStorage.getItem(authSessionStorageKey);

  if (!storedValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(storedValue);
    return AuthSessionSchema.parse(parsedValue);
  } catch {
    window.localStorage.removeItem(authSessionStorageKey);
    return null;
  }
};

export const setStoredAuthSession = (session: AuthSession): void => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(authSessionStorageKey, JSON.stringify(session));
};

export const clearStoredAuthSession = (): void => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(authSessionStorageKey);
};

export const isAccessTokenExpired = (session: AuthSession): boolean =>
  session.tokenExpires <= Date.now();
