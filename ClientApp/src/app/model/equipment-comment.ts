import { AUser } from "./user";

export interface EquipmentComment{
    id: number;
    equipmentId: number;
    userId: string;
    user: AUser;
    parentCommentId?: number;
    parentCommentName?: string;
    content: string;
    commentDate: Date;
    likes: number;
    dislikes: number;
}