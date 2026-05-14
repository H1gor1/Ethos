import { prisma } from "../../../lib/prisma.js"
import type { categoriesPaginatedRequest } from "./dto/categoriesPaginatedRequest.js";
import type { createCategoryRequest } from "./dto/createCategoryRequest.js"

export const CategoryRepository = {

    async create(data: createCategoryRequest){
        return await prisma.category.create({data: data});
    },

    async getById(categoryId: number){
        return await prisma.category.findFirst({
            where: {
                id: {
                    equals: categoryId
                }
            }
        })
    },

    async getSearchPaginated(data: categoriesPaginatedRequest) {
        const search = data.search || ''
        const take = data.take || 10
        const skip = data.skip || 0

        const result = await prisma.category.findMany({
            where: {
                name: {
                    contains: search
                }
            },
            take: take,
            skip: skip,
        })

        return result
    }
}
