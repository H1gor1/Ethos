import Express from "express";
import { AuthController } from "./authController.js";

export const router = Express.Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
