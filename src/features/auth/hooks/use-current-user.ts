"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/stores/auth.store";

import { getCurrentUser } from "@/features/auth/api/get-current-user.api";
import { authKeys } from "@/features/auth/api/query-keys";

export const useCurrentUser = () => {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const session = useAuthStore((state) => state.session);

  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: ({ signal }) => getCurrentUser(signal),
    enabled: hasHydrated && Boolean(session?.accessToken)
  });
};
