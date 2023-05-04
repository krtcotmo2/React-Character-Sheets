import { Modifier } from "./modifier";

export interface ToHit{
    id: string;
    charID: string;
    score: number;
    modDesc: string;
    toHitID: string;
    hitName: string;
    hitOrder: number;
    pinned: boolean;
    isMelee: boolean;
}

export interface ToHitGroup{
    value: number;
    breakdown: Modifier[];
    id: string;
    hitName: string;
    pinned: boolean;
    isMelee: boolean;
}