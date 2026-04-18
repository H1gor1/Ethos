import { UserRepository } from "./userRepository.js";
import type { CreateUserRequest } from "./createUserRequest.js";

export const UserService = {

    async createUser(data: CreateUserRequest) {
        const user = await UserRepository.createUser(data);
        return user;
    },

    async getUser(id: string) {
        const user = await UserRepository.getUser(id);
        return user;
    }
}