import { z } from "zod";

import { UserSchema } from "@/schemas/user.schema";

const passwordPattern = /^[\d!#$%&*@A-Z^a-z]*$/;

export const CreateUserFormSchema = z.object({
  username: z.string().trim().min(1, "Username is required."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .regex(passwordPattern, "Password contains invalid characters."),
  bio: z.string().trim(),
  image: z.string().trim()
});

export const CreateUserRequestSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required.")
    .transform((value) => value.toLowerCase()),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .transform((value) => value.toLowerCase()),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .regex(passwordPattern, "Password contains invalid characters."),
  bio: z.string().trim().min(1, "Bio is required when provided.").optional(),
  image: z.string().trim().min(1, "Image is required when provided.").optional()
});

export const CreateUserResponseSchema = UserSchema;

export type CreateUserFormValues = z.infer<typeof CreateUserFormSchema>;
export type CreateUserPayload = z.output<typeof CreateUserRequestSchema>;
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;

export const normalizeCreateUserPayload = (values: CreateUserFormValues): CreateUserPayload =>
  CreateUserRequestSchema.parse({
    ...values,
    bio: values.bio || undefined,
    image: values.image || undefined
  });
