import { create } from "zustand";

import {
  clearStoredAuthSession,
  getStoredAuthSession,
  setStoredAuthSession,
  type AuthSession
} from "@/lib/auth-session";

type AuthState = {
  hasHydrated: boolean;
  session: AuthSession | null;
  setHydrated: (hasHydrated: boolean) => void;
  setSession: (session: AuthSession | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  hasHydrated: false,
  session: null,
  setHydrated: (hasHydrated) => set({ hasHydrated }),
  setSession: (session) => set({ session })
}));

export const hydrateAuthStore = (): void => {
  const storedSession = getStoredAuthSession();

  useAuthStore.setState({
    session: storedSession,
    hasHydrated: true
  });
};

export const setAuthSession = (session: AuthSession): void => {
  setStoredAuthSession(session);
  useAuthStore.setState({ session });
};

export const clearAuthSession = (): void => {
  clearStoredAuthSession();
  useAuthStore.setState({ session: null });
};
