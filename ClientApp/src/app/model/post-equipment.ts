import { Equipment } from "./equipment";
import { Post } from "./post";

export interface PostEquipment{
    id: number;
    postId: number;
    post: Post;
    equipmentId: number;
    equipment: Equipment;
}