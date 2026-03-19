import { z } from "zod";

export const orderValues = ["ASC", "DESC"] as const;

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

export const OffsetPaginationSchema = z.object({
  limit: z.number().int().min(1),
  currentPage: z.number().int().min(1),
  nextPage: z.number().int().min(1).optional(),
  previousPage: z.number().int().min(1).optional(),
  totalRecords: z.number().int().min(0),
  totalPages: z.number().int().min(0)
});

export const UsersListResponseSchema = z.object({
  data: z.array(UserSchema),
  pagination: OffsetPaginationSchema
});

export type User = z.infer<typeof UserSchema>;
export type UsersListParams = z.infer<typeof UsersListParamsSchema>;
export type UsersListResponse = z.infer<typeof UsersListResponseSchema>;
