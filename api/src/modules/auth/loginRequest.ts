import * as z from 'zod';

export const LoginRequest = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export type LoginRequest = z.infer<typeof LoginRequest>;