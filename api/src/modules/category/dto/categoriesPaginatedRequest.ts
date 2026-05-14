import * as z from "zod";

export const categoriesPaginatedSchema = z.object({
  search: z.string().optional().default(""),
  skip: z.coerce.number().positive().optional(),
  take: z.coerce.number().positive().optional(),
});

export type categoriesPaginatedRequest = z.infer<typeof categoriesPaginatedSchema>;