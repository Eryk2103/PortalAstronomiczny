import { User } from "oidc-client";
import { AUser } from "./user";

export interface ArticleComment{
    id: number;
    articleId: number;
    userId: string;
    user: AUser;
    parentCommentId?: number;
    parentCommentName?: string;
    content: string;
    commentDate: Date;
    likes: number;
    dislikes: number;
}