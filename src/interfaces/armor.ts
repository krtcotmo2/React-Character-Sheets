import { Modifier } from "./modifier";

export interface ArmorSet {
    acID?: number;
    name:string;
    values: Modifier[];
    score: number;
    pinned: boolean;
}

export interface ArmorGrouping {
    charID: number;
    acDesc:string;
    sortValue: number;
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
    aidsFlatfoot: boolean | undefined;
    aidsTouchAttach: boolean | undefined
}