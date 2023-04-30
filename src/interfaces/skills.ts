import { Modifier } from "./modifier";

export interface Skill {
  value: number;
  breakdown: Modifier[];
  skillName: string;
  skillID: number;
  pinned: boolean,
}

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
