import { Equipment } from "./equipment";

export interface EquipmentLike{
    id?: number;
    equipment?: Equipment;
    equipmentId: number;
    userId: string;
    user?: object
}