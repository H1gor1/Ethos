import * as z from 'zod';

export const createPostRequestSchema = z.object({
    title: z.string().min(10, 'Title is required'),
    content: z.string().nonempty("Content is required"),
    sumary: z.string().optional(),
    coverImage: z.string().optional(),
    categoryId: z.number().nonoptional("Must have a category"),
});

export const postListItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  summary: z.string().optional(),
  coverImage: z.string().optional(),
  slug: z.string(),
  createdAt: z.date(),
})

export const postDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  summary: z.string().optional(),
  coverImage: z.string().optional(),
  slug: z.string(),
  createdAt: z.date(),
})



export type CreatePostRequest = z.infer<typeof createPostRequestSchema>;
export type PostListItemResponse = z.infer<typeof postListItemSchema>;
export type PostDetailsResponse = z.infer<typeof postDetailsSchema>;