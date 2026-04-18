import Express from "express";
import { validateRequest } from "../../shared/middlewares/validateRequest.js";
import { createUserRequestSchema } from "./createUserRequest.js";
import { UserController } from "./userController.js";

export const router = Express.Router()

router.get('/', UserController.getUser)
router.post('/', validateRequest(createUserRequestSchema), UserController.createUser)
