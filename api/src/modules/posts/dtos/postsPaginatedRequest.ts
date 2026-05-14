import * as z from "zod";

export const postsPaginatedSchema = z.object({
  search: z.string().optional().default(""),
  skip: z.coerce.number().positive().optional(),
  take: z.coerce.number().positive().optional(),
});

export type postsPaginatedRequest = z.infer<typeof postsPaginatedSchema>;