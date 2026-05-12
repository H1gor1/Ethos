import * as z from 'zod';

export const postListItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  summary: z.string().optional(),
  coverImage: z.string().optional(),
  slug: z.string(),
  createdAt: z.date(),
})

export type PostListItemResponse = z.infer<typeof postListItemSchema>;