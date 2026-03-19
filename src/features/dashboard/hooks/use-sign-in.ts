"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { setAuthSession } from "@/stores/auth.store";

import { dashboardKeys } from "@/features/dashboard/api/query-keys";
import { signIn } from "@/features/dashboard/api/sign-in.api";
import { type SignInValues } from "@/features/dashboard/schemas/auth.schema";

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SignInValues) => signIn(payload),
    onSuccess: async (session) => {
      setAuthSession(session);
      await queryClient.invalidateQueries({ queryKey: dashboardKeys.currentUser() });
      router.push("/dashboard/me");
    }
  });
};
