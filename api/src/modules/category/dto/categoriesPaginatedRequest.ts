import * as z from "zod";

export const categoriesPaginatedSchema = z.object({
    search: z.string(),
    skip: z.number().positive(),
    take: z.number().positive(),
});

export type categoriesPaginatedRequest = z.infer<typeof categoriesPaginatedSchema>;