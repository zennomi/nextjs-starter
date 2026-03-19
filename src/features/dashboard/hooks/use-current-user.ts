"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/stores/auth.store";

import { getCurrentUser } from "@/features/dashboard/api/get-current-user.api";
import { dashboardKeys } from "@/features/dashboard/api/query-keys";

export const useCurrentUser = () => {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const session = useAuthStore((state) => state.session);

  return useQuery({
    queryKey: dashboardKeys.currentUser(),
    queryFn: ({ signal }) => getCurrentUser(signal),
    enabled: hasHydrated && Boolean(session?.accessToken)
  });
};
