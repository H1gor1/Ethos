import Express from "express";
import { PostsController } from "./postsController.js";

export const router = Express.Router()

router.post('/', PostsController.create)
