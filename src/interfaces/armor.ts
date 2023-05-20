import { Modifier } from "./modifier";

export interface ArmorSet {
    name:string;
    values: Modifier[];
    score: number;
}

export interface Armor {
    id: number;
    charID: number;
    score: number;
    isMod: boolean;
    modDesc: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    acID: number;
    isBase: boolean;
}