import { Post } from "./post";

export interface PostLikes{
    id?: number;
    post?: Post;
    postId: number;
    userId: string;
    user?: object
}