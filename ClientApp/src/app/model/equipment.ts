import { Category } from "./category";

export interface Equipment {
    id?: number;
    name: String;
    categoryId: number;
    category: Category;
    likes: number;
    specification: string;
}