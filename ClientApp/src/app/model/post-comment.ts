import { AUser } from "./user";

export interface PostComment{
    id: number;
    postId: number;
    userId: string;
    user: AUser;
    parentCommentId?: number;
    parentCommentName?: string;
    content: string;
    commentDate: Date;
    likes: number;
    dislikes: number;
}