import type { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    const jwtSecret = process.env.JWT_SECRET as string;
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err || !decoded) return res.status(403).json({ message: 'User not authenticated' });
        req.user = decoded;
        next();
    });
}