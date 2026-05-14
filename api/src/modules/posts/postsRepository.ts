import { prisma } from "../../../lib/prisma.js";
import type { postsPaginatedRequest } from "./dtos/postsPaginatedRequest.js";

export const PostsRepository = {

    async createPost(data: any) {
        return await prisma.post.create({ data: data });
    },

    async getBySlug(slug: string) {
        return await prisma.post.findFirst({
            where: {
                slug: {
                    equals: slug
                }
            }
        })
    },

    async getSearchPaginated(data: postsPaginatedRequest) {
        const search = data.search || ''
        const take = data.take || 10
        const skip = data.skip || 0

        const result = await prisma.post.findMany({
            where: {
                title: {
                    contains: search
                }
            },
            take: take,
            skip: skip,
        })
        return result
    }

}