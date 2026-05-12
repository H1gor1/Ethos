import * as z from "zod";

export const deleteCategorySchema = z.object({
    id: z.number()
});

export type deleteCategoryRequest = z.infer<typeof deleteCategorySchema>;