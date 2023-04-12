import { Modifier } from "./modifier";

export interface Skill {
  value: number;
  breakdown: Modifier[];
  skillName: string;
  skillID: number;
  pinned: boolean,
  score: number;
}
