import Express from "express";
import { PostsController } from "./postsController.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.js";
import { createPostRequestSchema } from "./dtos/createPostRequest.js";
import { checkPermission } from "../../shared/middlewares/checkPermission.js";
import { PermissionEnum } from "../../shared/enums/permission.enum.js";
import { postsPaginatedSchema } from "./dtos/postsPaginatedRequest.js";

export const router = Express.Router()

router.post(
    '/', 
    validateRequest(createPostRequestSchema), 
    checkPermission(PermissionEnum.CREATE_POST), 
    PostsController.create
);

router.get(
    '/',
    validateRequest(postsPaginatedSchema, "query"),
    checkPermission(PermissionEnum.READ_ALL_POSTS),
    PostsController.getPaginated
);

router.get(
    "/:slug",
    checkPermission(PermissionEnum.READ_POST),
    PostsController.getBySlug
);
