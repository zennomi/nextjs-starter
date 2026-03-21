import { post } from "@/lib/api";

import {
  SignInResponseSchema,
  SignInSchema,
  type SignInValues
} from "@/features/auth/schemas/auth.schema";

export const signIn = async (payload: SignInValues) => {
  const body = SignInSchema.parse(payload);
  const response = await post<unknown, SignInValues>("/v1/auth/email/login", body);

  return SignInResponseSchema.parse(response);
};
