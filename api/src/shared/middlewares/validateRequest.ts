import * as z from 'zod';
import type { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: z.ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.safeParse(req.body);
            
            if (!result.success) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: result.error.flatten(),
                });
            }
            
            next();
        } catch (err) {
            next(err);
        }
    }
}