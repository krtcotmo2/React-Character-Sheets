import { ModifierType } from "../enum/modifier-type";

export interface RawSkill {
  id: string;
  charID: string;
  score: number;
  isMod: boolean;
  modDesc: string;
  createdAt: string;
  updatedAt: string;
  skillID: number;
  pinned: boolean;
  isClassSkill: boolean;
  isRanks: boolean;
  skillName: string;
}
