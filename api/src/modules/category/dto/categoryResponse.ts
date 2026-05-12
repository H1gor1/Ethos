import * as z from "zod";

export const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    color: z.string(),
});

export type categoryResponse = z.infer<typeof categorySchema>;