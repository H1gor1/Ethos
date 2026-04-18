import * as z from 'zod';

export const createUserRequestSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;