import * as z from "zod";

export const categoriesPaginatedSchema = z.object({
  search: z.string().optional().default(""),
  skip: z.coerce.number().positive(),
  take: z.coerce.number().positive(),
});

export type categoriesPaginatedRequest = z.infer<typeof categoriesPaginatedSchema>;