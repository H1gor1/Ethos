import * as z from 'zod';
import type { Request, Response, NextFunction } from 'express';

type RequestSource = 'body' | 'query' | 'params';

export const validateRequest = (schema: z.ZodType, source: RequestSource = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req[source]);
      if (!result.success) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: z.treeifyError(result.error),
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  }
}