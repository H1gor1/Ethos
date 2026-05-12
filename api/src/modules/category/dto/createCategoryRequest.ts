import * as z from "zod";

export const createCategorySchema = z.object({
    name: z.string(),
    color: z.string(),
});

export type createCategoryRequest = z.infer<typeof createCategorySchema>;