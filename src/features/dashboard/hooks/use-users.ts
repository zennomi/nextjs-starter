"use client";

import { useQuery } from "@tanstack/react-query";

import { UsersListParamsSchema, type UsersListParams } from "@/schemas/user.schema";

import { useAuthStore } from "@/stores/auth.store";

import { getUsers } from "@/features/dashboard/api/get-users.api";
import { dashboardKeys } from "@/features/dashboard/api/query-keys";

export const useUsers = (input: Partial<UsersListParams>) => {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const session = useAuthStore((state) => state.session);
  const params = UsersListParamsSchema.parse(input);

  return useQuery({
    queryKey: dashboardKeys.usersList(params),
    queryFn: ({ signal }) => getUsers(params, signal),
    enabled: hasHydrated && Boolean(session?.accessToken)
  });
};
