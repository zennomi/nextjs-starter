"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUser } from "@/features/dashboard/api/create-user.api";
import { dashboardKeys } from "@/features/dashboard/api/query-keys";
import { type CreateUserFormValues } from "@/features/dashboard/schemas/create-user.schema";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: dashboardKeys.usersCreate(),
    mutationFn: (payload: CreateUserFormValues) => createUser(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: dashboardKeys.users() });
    }
  });
};
