import * as z from "zod";
import type { Request, Response } from "express";
import type { CreatePostRequest } from "./dtos/createPostRequest.js";
import { PostsService } from "./postsService.js";
import { postListItemSchema } from "./dtos/postListResponse.js";

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
    },

    async getBySlug(req: Request, res: Response) {
        try{
            const slug = req.params.id;
            const post = await PostsService.getBySlug(slug);
            return res.status(200).json(post);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching post", 
                error
            })
        }
    },

    async getPaginated(req: Request, res: Response){
        try {
            const { search, skip, take } = req.query;

            const params = {
                search: String(search ?? ""),
                skip: Number(skip),
                take: Number(take),
            }

            const posts = await PostsService.getPostList(params);
            console.log(posts)
            const postListSquema = z.array(postListItemSchema);
            const parsedPosts = postListSquema.safeParse(posts);

            if(!parsedPosts.success) {
                return res.status(500).json({
                    message: "Invalid posts response format",
                    errors: z.treeifyError(parsedPosts.error),
                });
            }
            return res.status(200).json(parsedPosts.data);
        } catch (error) {
            return res.status(404).json({
                message: "Posts not found",
                error
            });
        }
    }
}
