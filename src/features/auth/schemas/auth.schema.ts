import { z } from "zod";

import { AuthSessionSchema } from "@/lib/auth-session";

export const SignInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters.")
});

export const SignInResponseSchema = AuthSessionSchema;

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1)
});

export const RefreshTokenResponseSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  tokenExpires: z.number().int().positive()
});

export type SignInValues = z.infer<typeof SignInSchema>;
