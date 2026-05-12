import * as z from 'zod';

export const createPostRequestSchema = z.object({
    title: z.string().min(10, 'Title is required'),
    content: z.string().nonempty("Content is required"),
    sumary: z.string().optional(),
    coverImage: z.string().optional(),
    categoryId: z.number().nonoptional("Must have a category"),
});

export type CreatePostRequest = z.infer<typeof createPostRequestSchema>;