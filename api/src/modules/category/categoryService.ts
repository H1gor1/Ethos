import { CategoryRepository } from "./categoryRepository.js";
import type { categoriesPaginatedRequest } from "./dto/categoriesPaginatedRequest.js";
import type { createCategoryRequest } from "./dto/createCategoryRequest.js";

export const CategoryService = {
    async createCategory(data: createCategoryRequest) {
        return CategoryRepository.create(data);
    },

    async getCategoryById(id: number) {
        return CategoryRepository.getById(id);
    },

    async getCategories(data: categoriesPaginatedRequest) {
        return CategoryRepository.getSearchPaginated(data);
    }
}