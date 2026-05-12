import * as z from 'zod';

export const UserResponse = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
});

export type UserResponse = z.infer<typeof UserResponse>;