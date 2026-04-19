import Express from "express";
import { validateRequest } from "../../shared/middlewares/validateRequest.js";
import { createUserRequestSchema } from "./createUserRequest.js";
import { UserController } from "./userController.js";
import { checkPermission } from "../../shared/middlewares/checkPermission.js";
import { PermissionEnum } from "../../shared/enums/permission.enum.js";

export const router = Express.Router()

router.get('/', checkPermission(PermissionEnum.READ_USER), UserController.getUser)
router.post('/', validateRequest(createUserRequestSchema), UserController.createUser)
