import { prisma } from "../../../lib/prisma.js";
import type { Request, Response, NextFunction } from 'express';


export const checkPermission = (reqPermission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user || typeof user === 'string') {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const rolesIds = user.roles.map((r: { id: number; }) => r.id);
        try {
            const permission = await prisma.rolePermission.findMany({
                where: {
                    roleId: { in: rolesIds }
                },
                include: {
                    permission: true,
                }
            });

            const hasPermission = permission.some(
                (rp: { permission: { name: string; }; }) => rp.permission.name === reqPermission
            );

            if (!hasPermission) {
                return res.status(403).json({ message: 'Forbidden' });
            }
        } catch (err) {
            return next(err);
        }

        next();
    }
}