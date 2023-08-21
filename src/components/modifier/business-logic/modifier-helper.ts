import { Stat } from "../../../interfaces/stat";
import { store } from "../../../redux/configure-store";
import { RawSkill } from "../../../interfaces/skills";
import { Character } from "../../../interfaces/character";
import { SavingThrow } from "../../../interfaces/saving-throw";
import { Modifier } from "../../../interfaces/modifier";
import { ModifierType } from "../../../enum/modifier-type";
import { ToHitGroup } from "../../../interfaces/to-hit";
import { deleteStatLine, saveStatLine, updateStatLines } from "../../../api/stats-api";
import { deleteSavesLine, saveSavesLine, updateSavesLines } from "../../../api/saves-api";
import { deleteSkillLines, saveSkillLine, updateReducersAfterCharUpdates, updateSkillLines } from "../../../api/skills-api";
import { deleteToHitLine, saveToHitLine, updateToHitLines } from "../../../api/to-hit-api";
import { ArmorSet } from "../../../interfaces/armor";
import { deleteArmorLine, saveArmorLine, updateArmorLines } from "../../../api/armor-api";

export const getStatToModify = (stat: string) => {
  return stat;
};

export const getReducer = (
  whatIsMod: string
): SavingThrow | Character | Stat | RawSkill[] | ToHitGroup[] | ArmorSet[] => {
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
    case "Armor":
      return store.getState().armor;
    default:
      return [];
  }
};

export const getModifiers = (
  value?: string,
  characteristic?: SavingThrow | Character | Stat | RawSkill[] | ToHitGroup[] | ArmorSet[]
): Modifier[] => {
  if (!characteristic || !value) {
    return [] as Modifier[];
  }
  if (Array.isArray(characteristic)) {
    if (instanceOfRawSkill(characteristic[0])) {
      let arr = characteristic as RawSkill[];
      arr = arr.filter((skill) => skill.skillName === value);
      return arr.map((skill) => {
        return {
          id: +skill.id,
          score: skill.score,
          type: skill.isMod
            ? ModifierType.MODIFIER
            : skill.isClassSkill
            ? ModifierType.CLASSSKILL
            : skill.isRanks
            ? ModifierType.BASE
            : ModifierType.TEMPORARY,
          modDesc: skill.modDesc,
        };
      });
    }

    if (instanceOfToHit(characteristic[0])) {
      const arr = characteristic as ToHitGroup[];
      const hitGroup = arr.find((hit) => hit.hitName === value);
      return hitGroup?.breakdown || [];
    }

    if (instanceOfArmor(characteristic[0])) {
      const arr = characteristic as ArmorSet[];
      const armorSet = arr.find((armor) => armor.name === value);
      return armorSet?.values || [];
    }
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

  return [];
};

const instanceOfRawSkill = (object: any): object is RawSkill => {
  return object && "skillName" in object;
};
const instanceOfToHit = (object: any): object is ToHitGroup => {
  return object && "hitName" in object;
};
const instanceOfArmor = (object: any): object is ArmorSet => {
  return object && "name" in object;
};

export const getStateIdFromName = (s: string): number => {
  switch (s.toLowerCase()) {
    case "strength":
      return 1;
    case "dexterity":
      return 2;
    case "constitution":
      return 3;
    case "intelligence":
      return 4;
    case "wisdom":
      return 5;
    case "charisma":
      return 6;
    case "fortitude":
      return 1;
    case "reflex":
      return 2;
    case "will":
      return 3;
    default:
      return 0;
  }
};

export const getModDescription = (m: Modifier, characteristic: string) => {
  switch (m.type) {
    case ModifierType.BASE:
      if (characteristic === "Skill") {
        return "Ranks";
      }
      return "Base";
    case ModifierType.CLASSSKILL:
      return "Class Skill";
    case ModifierType.MODIFIER:
    case ModifierType.TEMPORARY:
    default:
      return m.modDesc;
  }
};

export const getSaveFunction = (whatIsMod: string) => {
  switch (whatIsMod) {
    case "Save":
      return updateSavesLines;
    case "Skill":
      return updateSkillLines;
    case "Stat":
      return updateStatLines;
    case "Armor":
      return updateArmorLines;
    case "ToHit":
    default:
      return updateToHitLines;
  }
};

export const getAddFunction = (whatIsMod: string) => {
  switch (whatIsMod) {
    case "Save":
      return saveSavesLine;
    case "Skill":
      return saveSkillLine;
    case "Stat":
      return saveStatLine;
    case "ToHit":
      return saveToHitLine;
    case "Armor":
      return saveArmorLine;
    default:
      return async (charId: string, body: {}) => {};
  }
};

export const getDeleteFunction = (whatIsMod: string) => {
  switch (whatIsMod) {
    case "Save":
      return deleteSavesLine;
    case "Skill":
      return deleteSkillLines;
    case "Stat":
      return deleteStatLine;
    case "ToHit":
      return deleteToHitLine;
    case "Armor":
      return deleteArmorLine;
    default:
      return async (charId: string, id: string) => {};
  }
};

export const getNavigateUrl = (whatIsMod: string, charId: string) => {
  switch (whatIsMod) {
    case "Save":
      return `/character/save/${charId}`;
    case "Skill":
      return `/character/skills/${charId}`;
    case "Armor":
        return `/character/acs/${charId}`;
    case "Stat":
      return `/character/stats/${charId}`;
    case "ToHit":
      return `/character/tohits/${charId}`;
    default:
      return `/character/overview/${charId}`;
  }
};

export const saveModifier = (
  char: Character, 
  modified: Modifier[], 
  state: {whatIsMod: string, modified: string},
  modifiers: Modifier[]
) => {
  const needsUpdates: Modifier[] = [];
  modified.forEach(mod => {
      const oldVal = modifiers.find(old => old.id === mod.id);
      if(oldVal?.modDesc !== mod.modDesc || oldVal?.score !== mod.score
        || oldVal?.aidsFlatfoot !== mod.aidsFlatfoot || oldVal?.aidsTouchAttach !== mod.aidsTouchAttach){
          delete mod.type;
          needsUpdates.push(mod);
      }
  });
  if(needsUpdates.length > 0){
      const updateFunction = getSaveFunction(state.whatIsMod);
      updateFunction(char.charID.toString(), needsUpdates)
          .then( async (c: Character) => {
             updateReducersAfterCharUpdates(c);
          });
  }
}

export const addNewModifier = (
  char: Character, 
  newScore: number, 
  newDesc: string,
  state: { whatIsMod: string; modified: string; id: number; pinned: boolean },
  aidsFlatfoot?: boolean,
  aidsTouchAttach?: boolean

) => {
  const addFunction = getAddFunction(state.whatIsMod);
  // need method to build out proper structure
  const newMod = {
    charID: char.charID,
    statID: getStateIdFromName(state.modified),
    saveID: getStateIdFromName(state.modified),
    acID: state.id,
    skillID: state.id,
    toHitID: state.id,
    score: +newScore,
    isMod: true,
    isBase: false,
    isClassSkill: false,
    isRanks: false,
    modDesc: newDesc,
    pinned: state.pinned || false,
    aidsFlatfoot,
    aidsTouchAttach
  }
  // need to define other methods including update api
  addFunction(char.charID.toString(), newMod).then(async (c: Character) => {
    updateReducersAfterCharUpdates(c);
  });
};

export const deleteModifier = (char: Character, state: any, id: number) => {
  const deleteFunction = getDeleteFunction(state.whatIsMod);
  deleteFunction(char.charID.toString(), id.toString())
    .then( async (c: Character) => {
      updateReducersAfterCharUpdates(c);
    })
}
