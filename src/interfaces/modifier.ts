import { ModifierType } from "../enum/modifier-type";

export interface Modifier{
    id: number;
    score: number;
    type: ModifierType;
    modDesc: string;
}