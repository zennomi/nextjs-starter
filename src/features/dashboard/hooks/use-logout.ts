"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AppError } from "@/lib/app-error";

import { clearAuthSession } from "@/stores/auth.store";

import { logout } from "@/features/dashboard/api/logout.api";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuthSession();
      queryClient.clear();
      router.replace("/sign-in");
    },
    onError: (error) => {
      if (error instanceof AppError && error.status === 401) {
        clearAuthSession();
        queryClient.clear();
        router.replace("/sign-in");
      }
    }
  });
};
