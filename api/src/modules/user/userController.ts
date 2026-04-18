import type { Request, Response } from "express";
import { UserResponse } from "./UserResponse.js";
import type { CreateUserRequest } from "./createUserRequest.js";
import { UserService } from "./userService.js";

export const UserController = {
    async getUser(req: Request, res: Response) {
        
        const { email } = req.query;

        if (typeof email !== 'string') {
            return res.status(400).json({ message: "Invalid user email" });
        }

        const user = await UserService.getUser(email);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const parsedUser = UserResponse.safeParse(user);

        if (!parsedUser.success) {
            return res.status(500).json({ message: "Error parsing user data" });
        }

        res.json(parsedUser.data);
    },

    async createUser(req: Request<{}, {}, CreateUserRequest>, res: Response) {
        const newUser = await UserService.createUser(req.body);

        res.status(201).json(UserResponse.safeParse(newUser).data);
    }
} 