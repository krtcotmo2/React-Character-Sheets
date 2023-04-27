import { CharLevel } from "./levels";
import { SavingThrow } from "./saving-throw";
import { Skill } from "./skills";
import { Stat } from "./stat";

export interface Character {
    alignment: string;
    charHP: number;
    charID: number;
    charName: string;
    image: string;
    init: number;
    isDead: boolean;
    race: string;
    saves?: SavingThrow;
    stats?: Stat;
    skills?: Skill[];
    userID: number;
    levels?: CharLevel[]
}

