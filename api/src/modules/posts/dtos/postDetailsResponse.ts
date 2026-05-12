import * as z from 'zod';

export const postDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  summary: z.string().optional(),
  coverImage: z.string().optional(),
  slug: z.string(),
  createdAt: z.date(),
})


export type PostDetailsResponse = z.infer<typeof postDetailsSchema>;