import Express from "express";
import { CategoryController } from "./categoryController.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.js";
import { createCategorySchema } from "./dto/createCategoryRequest.js";
import { checkPermission } from "../../shared/middlewares/checkPermission.js";
import { PermissionEnum } from "../../shared/enums/permission.enum.js";
import { categoriesPaginatedSchema } from "./dto/categoriesPaginatedRequest.js";

export const router = Express.Router()

router.post(
    '/',
    checkPermission(PermissionEnum.CREATE_CATEGORY),
    validateRequest(createCategorySchema), 
    CategoryController.create
);

router.get(
    '/',
    checkPermission(PermissionEnum.READ_ALL_CATEGORIES),
    validateRequest(categoriesPaginatedSchema, "query"),
    CategoryController.getPaginated
)

router.get(
    '/:id',
    checkPermission(PermissionEnum.READ_CATEGORY),
    CategoryController.getById
)
