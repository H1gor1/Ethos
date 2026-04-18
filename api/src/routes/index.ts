import { Router } from 'express';
import { router as userRoutes } from '../modules/user/userRoutes.js';
import { router as authRoutes } from '../modules/auth/authRoutes.js';
import { authMiddleware } from '../shared/middlewares/authValidate.js';

export const router = Router();

router.use('/auth', authRoutes);
router.use('/users', authMiddleware, userRoutes);