import { prisma } from "../../../lib/prisma.js"
import type { CreateUserRequest } from "./createUserRequest.js"

export const UserRepository = {

    async createUser(data: CreateUserRequest) {
        const newUser = {
            username: data.username,
            email: data.email,
            password: data.password,
        }

        const user = await prisma.user.create({ data: newUser });

        return user;
    },

    async getUser(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        return user;
    }
}