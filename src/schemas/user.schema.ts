import { z } from "zod";

import { OffsetPaginationSchema, orderValues } from "./common.schema";

export const UserSchema = z.object({
  id: z.string().min(1),
  username: z.string().min(1),
  email: z.email(),
  bio: z.string().optional(),
  image: z.url().or(z.literal("")),
  posts: z.array(z.unknown()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const UsersListParamsSchema = z.object({
  limit: z.number().int().min(1).max(100).default(10),
  page: z.number().int().min(1).default(1),
  order: z.enum(orderValues).default("ASC")
});

export const UsersListResponseSchema = z.object({
  data: z.array(UserSchema),
  pagination: OffsetPaginationSchema
});

export type User = z.infer<typeof UserSchema>;
export type UsersListParams = z.infer<typeof UsersListParamsSchema>;
export type UsersListResponse = z.infer<typeof UsersListResponseSchema>;
