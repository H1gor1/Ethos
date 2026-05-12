import type { Request, Response } from "express";
import type { CreatePostRequest } from "./dtos/createPostRequest.js";
import { PostsService } from "./postsService.js";

export const PostsController = {
    async create(req: Request<{}, {}, CreatePostRequest>, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            const createPost = await PostsService.createPost(req.body, req.user.id);
            res.status(201).json({
                message: "Post created",
            })
        } catch (error) {
            res.status(500).json({
                message: "Error creating post", 
                error
            })
        }
    }
}
