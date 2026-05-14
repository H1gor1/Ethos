import type { Request, Response } from "express";
import type { createCategoryRequest } from "./dto/createCategoryRequest.js";
import { CategoryService } from "./categoryService.js"
import { categorySchema } from "./dto/categoryResponse.js"
import * as z from "zod";

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
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
            }

            const category = await CategoryService.getCategoryById(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }

            const parsedCategory = categorySchema.safeParse(category);
            if (!parsedCategory.success) {
                return res.status(500).json({
                    message: "Invalid category response format",
                    errors: z.treeifyError(parsedCategory.error),
                });
            }

            return res.status(200).json(parsedCategory.data);
        } catch (error) {
            return res.status(404).json({
            message: "Category not found",
            error
            });
        }
    },

    async getPaginated(req: Request, res: Response) {
        try{
            const { search, skip, take } = req.query;

            const params = {
                search: String(search ?? ""),
                skip: Number(skip),
                take: Number(take),
            }

            const categories = await CategoryService.getCategories(params);
            const categoriesSchema = z.array(categorySchema);
            const parsedCategories = categoriesSchema.safeParse(categories);

            if (!parsedCategories.success) {
                return res.status(500).json({
                    message: "Invalid categories response format",
                    errors: z.treeifyError(parsedCategories.error),
                });
            }

            return res.status(200).json(parsedCategories.data);
        } catch (error) {
            return res.status(404).json({
                message: "Categories not found",
                error
            });
        }
    }
}
