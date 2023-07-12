import { Stat } from "../../../interfaces/stat";
import { store } from "../../../redux/configure-store";
import { RawSkill } from "../../../interfaces/skills";
import { Character } from "../../../interfaces/character";
import { SavingThrow } from "../../../interfaces/saving-throw";
import { Expendable } from "../../../interfaces/expendable";
import { Feat } from "../../../interfaces/feats";
import { CharLevel } from "../../../interfaces/levels";
import { Modifier } from "../../../interfaces/modifier";
import { ModifierType } from "../../../enum/modifier-type";
import { Module } from "module";
import { ToHit, ToHitGroup } from "../../../interfaces/to-hit";
import { updateStatLines } from "../../../api/stats-api";
import { updateSavesLines } from "../../../api/saves-api";
import { updateSkillLines } from "../../../api/skills-api";

export const getStatToModify = (stat: string) => {
  return stat;
};

export const getReducer = (
  whatIsMod: string
):
  | SavingThrow
  | Character
  | Stat
  | RawSkill[]
  | ToHitGroup[] => {
  switch (whatIsMod) {
    case "Save":
      return store.getState().saves;
    case "Skill":
      return store.getState().skills;
    case "Character":
      return store.getState().character;
    case "Stat":
      return store.getState().stats;
    case "ToHit":
      return store.getState().toHitGroups;
    default:
      return []
  }
};

export const getModifiers = (
  value?: string,
  characteristic?:
    | SavingThrow
    | Character
    | Stat
    | RawSkill[]
    | ToHitGroup[]
): Modifier[] => {
  if (!characteristic || !value) {
    return [] as Modifier[];
  }
  if(Array.isArray(characteristic)){
    if(instanceOfRawSkill(characteristic[0])){
      let arr = characteristic as RawSkill[];
      arr =  arr.filter(skill => skill.skillName === value);
      return arr.map(skill => {
        return {
          id: +skill.id,
          score: skill.score,
          type: skill.isMod ? ModifierType.MODIFIER : skill.isClassSkill ? ModifierType.CLASSSKILL :
            skill.isRanks ? ModifierType.BASE : ModifierType.TEMPORARY,
          modDesc: skill.modDesc
        }
      })
    };

    if(instanceOfToHit(characteristic[0])){
      
      const arr = characteristic as ToHitGroup[];
      const hitGroup =  arr.find(hit => hit.hitName === value);
      return hitGroup?.breakdown || []
    };
  }
  let c;
  switch (value.substring(0, 3).toLowerCase()) {
    case "str":
      c = characteristic as Stat;
      return c.str.breakdown;
    case "dex":
      c = characteristic as Stat;
      return c.dex.breakdown;
    case "cha":
      c = characteristic as Stat;
      return c.chr.breakdown;
    case "con":
      c = characteristic as Stat;
      return c.con.breakdown;
    case "int":
      c = characteristic as Stat;
      return c.int.breakdown;
    case "wis":
      c = characteristic as Stat;
      return c.wis.breakdown;
    case "for":
      c = characteristic as SavingThrow;
      return c.fortitude.breakdown;
    case "ref":
      c = characteristic as SavingThrow;
      return c.reflex.breakdown;
    case "wil":
      c = characteristic as SavingThrow;
      return c.will.breakdown;

  }
  
  return []
};

const instanceOfRawSkill = (object: any): object is RawSkill => {
  return object && 'skillName' in object;
}
const instanceOfToHit = (object: any): object is ToHitGroup => {
  return object && 'hitName' in object;
}

export const getModDescription = (m :Modifier, characteristic: string)=> {
  switch(m.type){
    case ModifierType.BASE:
      if(characteristic === 'Skill'){
        return 'Ranks';
      }
      return 'Base';
    case ModifierType.CLASSSKILL:
      return 'Class Skill'
    case ModifierType.MODIFIER:
    case ModifierType.TEMPORARY:
    default:
      return m.modDesc;
  }
}

export const getSaveFunction = (whatIsMod: string) => {
  switch (whatIsMod) {
    case "Save":
      return updateSavesLines;
    case "Skill":
      return updateSkillLines;
    // case "Character":
    //   return store.getState().character;
    case "Stat":
    default:
      return updateStatLines;
    // case "ToHit":
    //   return store.getState().toHitGroups;
  }
}

export const getNavigateUrl = (whatIsMod: string, charId: string) =>{
  switch (whatIsMod) {
    case "Save":
      return `/character/save/${charId}`;
    case "Skill":
      return `/character/skills/${charId}`;
    // case "Character":
    //   return store.getState().character;
    case "Stat":
    default:
      return  `/character/stats/${charId}`;
    // case "ToHit":
    //   return store.getState().toHitGroups;
  }
}