import { type CreatePostRequest } from "./dtos/createPostRequest.js";
import { PostsRepository } from "./postsRepository.js";
import slugify from "slugify";


export const PostsService = {
    async createPost(data: CreatePostRequest, authorId: string) {

        const slug = slugify(data.title, {
            lower: true,
            strict: true,
            locale: 'pt',
            trim: true,
        })

        const newPost = {
            title: data.title,
            content: data.content,
            sumary: data.sumary || "",
            coverImage: data.coverImage || "",
            categoryId: data.categoryId,
            authorId: authorId,
            slug: slug,
            totalLikes: 0,
            totalViews: 0,
            disabled: false,
            createdAt: new Date()
        }

        return PostsRepository.createPost(newPost);
    }
}
