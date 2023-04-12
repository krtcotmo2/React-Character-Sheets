import { Modifier } from "./modifier";


export interface SavingThrow{
    fortitude: {
        value: number;
        breakdown:Modifier[];
    },
    reflex: {
        value: number;
        breakdown:Modifier[];
    },
    will: {
        value: number;
        breakdown:Modifier[];
    },
}