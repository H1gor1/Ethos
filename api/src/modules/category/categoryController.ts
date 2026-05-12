import type { Request, Response } from "express";
import type { createCategoryRequest } from "./dto/createCategoryRequest.js";
import { CategoryService } from "./categoryService.js"
import type { categoriesPaginatedRequest } from "./dto/categoriesPaginatedRequest.js";


export const CategoryController = {
    async create(req: Request<{}, {}, createCategoryRequest>, res: Response) {
        try{
            const createCategory = await CategoryService.createCategory(req.body);
            return res.status(201).json(createCategory);
        } catch (error) {
            return res.status(500).json({
                message: "Error creating category",
                error
            });
        }
    },

    async getById(req: Request, res: Response) {
        try{
            const category = await CategoryService.getCategoryById(req.body);
            return res.status(200).json(category);
        } catch (error) {
            return res.status(404).json({
                message: "Category not found",
                error
            });
        }
    },

    async getPaginated(req: Request<{}, {}, categoriesPaginatedRequest>, res: Response) {
        try{
            const categories = await CategoryService.getCategories(req.body);
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(404).json({
                message: "Categories not found",
                error
            });
        }
    }
}
