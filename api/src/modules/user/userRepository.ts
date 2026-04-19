import { id } from "zod/locales";
import { prisma } from "../../../lib/prisma.js"
import type { registerRequest } from "../auth/registerRequest.js";

export const UserRepository = {

    async createUser(data: registerRequest) {
        const newUser = {
            username: data.username,
            email: data.email,
            password: data.password,
        }
        const user = await prisma.user.create({ data: newUser });

        const newUserProfile = {
            userId: user.id,
            bio: "Thinking...",
        }

        const profile = await prisma.profile.create({
            data: newUserProfile
        })


        return user;
    },

    async findUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email },
            include: {
                userRoles: {
                    include: {
                        role: true,
                    }
                }
            }
        });
    },
}