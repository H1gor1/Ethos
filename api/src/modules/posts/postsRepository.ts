import { prisma } from "../../../lib/prisma.js";

export const PostsRepository = {

    async createPost(data: any) {
        return await prisma.post.create({ data: data });
    }

}