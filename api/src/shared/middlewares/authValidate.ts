import type { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import type { AuthUser } from "../types/authUser.js";


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

        if (typeof decoded === "string") {
            return res.status(403).json({ message: 'Invalid token payload' });
        }

        const payload = decoded as Partial<AuthUser>;
        if (!payload.id || !payload.email || !payload.username || !Array.isArray(payload.roles)) {
            return res.status(403).json({ message: 'Invalid token payload' });
        }

        req.user = {
            id: payload.id,
            email: payload.email,
            username: payload.username,
            roles: payload.roles,
        };

        next();
    });
}
