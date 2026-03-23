import { z } from "zod";

export const orderValues = ["ASC", "DESC"] as const;

export const OffsetPaginationSchema = z.object({
  limit: z.number().int().min(1),
  currentPage: z.number().int().min(1),
  nextPage: z.number().int().min(1).optional(),
  previousPage: z.number().int().min(1).optional(),
  totalRecords: z.number().int().min(0),
  totalPages: z.number().int().min(0)
});

export type OffsetPagination = z.infer<typeof OffsetPaginationSchema>;
