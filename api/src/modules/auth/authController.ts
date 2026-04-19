import type { Request, Response } from "express";
import { AuthService } from "./authService.js";
import type { LoginRequest } from "./loginRequest.js";
import type { registerRequest } from "./registerRequest.js";

export const AuthController = {
    async register(req: Request<{}, {}, registerRequest>, res: Response) {
        try {
            const newUser = await AuthService.register(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: "Error registering user", error });
        }
    },

    async login(req: Request<{}, {}, LoginRequest>, res: Response) {
        try {
            const loginResult = await AuthService.login(req.body);
            res.status(200).json(loginResult);
        } catch (error) {
            res.status(401).json({ message: "Invalid email or password" });
        }
    }
}