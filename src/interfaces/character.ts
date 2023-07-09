import { CharLevel } from "./levels";
import { SavingThrow } from "./saving-throw";
import { RawSkill } from "./skills";
import { Stat } from "./stat";
import { ToHitGroup } from "./to-hit";

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
  skills?: RawSkill[];
  userID: number;
  levels?: CharLevel[];
  isCaster: boolean;
  toHitGroups: ToHitGroup[];
}

export interface SaveCharacter {
  userID: number;
  charName: string;
  charHP: number;
  CharXP: number;
  raceID: number;
  alignID: number;
  init: number;
  isDead: boolean;
  image: string;
}
