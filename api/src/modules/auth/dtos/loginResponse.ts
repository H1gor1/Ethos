import * as z from "zod";

export const LoginResponse = z.object({
    token: z.string(),
    expiresIn: z.number(),
});

export type LoginResponse = z.infer<typeof LoginResponse>;