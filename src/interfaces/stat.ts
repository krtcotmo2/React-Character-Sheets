import { Modifier } from "./modifier";

export interface Stat{
    str: {
        value: number;
        breakdown:Modifier[];
    },
    dex: {
        value: number;
        breakdown:Modifier[];
    },
    con: {
        value: number;
        breakdown:Modifier[];
    },
    int: {
        value: number;
        breakdown:Modifier[];
    },
    wis: {
        value: number;
        breakdown:Modifier[];
    },
    chr: {
        value: number;
        breakdown:Modifier[];
    },
}