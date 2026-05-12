import Express from "express";
import { CategoryController } from "./categoryController.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.js";
import { createCategorySchema } from "./dto/createCategoryRequest.js";
import { checkPermission } from "../../shared/middlewares/checkPermission.js";
import { PermissionEnum } from "../../shared/enums/permission.enum.js";

export const router = Express.Router()

router.post('/', validateRequest(createCategorySchema), CategoryController.create);
