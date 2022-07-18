import { Equipment } from "./equipment";

export interface Post {
    id: number;
    user: object;
    userId: string;
    likes: number;
    dislikes: number;
    photo: string;
    title: string;
    content: string;
    dateAdded: Date;
    celestialBoddy: string;
    equipment: Equipment[];
    userName?: string;
    liked?: boolean;
}