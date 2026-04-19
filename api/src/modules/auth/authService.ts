import { UserRepository } from "../user/userRepository.js";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserResponse } from "../user/UserResponse.js";
import type { LoginRequest } from "./loginRequest.js";
import type { registerRequest } from "./registerRequest.js";

export const AuthService = {
    async register(userData: registerRequest) {
        
        const existingUser = await UserRepository.findUserByEmail(userData.email);

        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(userData.password, 12);

        const newUser = await UserRepository.createUser({
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
        });

        return { user: UserResponse.safeParse(newUser).data};
    },

    async login(data: LoginRequest) {
        const user = await UserRepository.findUserByEmail(data.email);
        
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const jwtSecret: Secret = process.env.JWT_SECRET as Secret;
        const jwtExpiresIn: SignOptions["expiresIn"] =
            (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) ?? "1h";

        const roles = user.userRoles.map((userRole) => ({
            id: userRole.roleId,
            name: userRole.role.name,
        }));

        const token = jwt.sign(
            { 
            username: user.username, 
            email: user.email,
            roles,
            }, 
            jwtSecret, 
            { 
                expiresIn: jwtExpiresIn 
            }
        );

        return { token: token, expiresIn: jwtExpiresIn };

    }
}