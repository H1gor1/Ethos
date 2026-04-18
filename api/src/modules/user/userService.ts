import { UserRepository } from "./userRepository.js";
import type { CreateUserRequest } from "./createUserRequest.js";

export const UserService = {

    async createUser(data: CreateUserRequest) {
        const user = await UserRepository.createUser(data);
        return user;
    },

    async getUser(email: string) {
        const user = await UserRepository.findUserByEmail(email);
        return user;
    }
}