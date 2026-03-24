"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { routes } from "@/config/routes";

import { setAuthSession } from "@/stores/auth.store";

import { authKeys } from "@/features/auth/api/query-keys";
import { signIn } from "@/features/auth/api/sign-in.api";
import { type SignInValues } from "@/features/auth/schemas/auth.schema";

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SignInValues) => signIn(payload),
    onSuccess: async (session) => {
      setAuthSession(session);
      await queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      router.push(routes.dashboard.me);
    }
  });
};
