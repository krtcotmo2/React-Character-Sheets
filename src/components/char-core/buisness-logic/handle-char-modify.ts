import { Character, UpdateCharacter } from "../../../interfaces/character";
import { alignments, races } from '../../../enum/coreVals';

export const buildChar = (
  char: Character,
  whatIsMod: string,
  value: number
) => {
    const c: UpdateCharacter = {
        charID: char.charID,
        alignID: alignments.find(a => a.value === char.alignment)?.id || 0,
        raceID: races.find(r => r.value === char.race)?.id || 0,
        charHP: char.charHP,
        init: char.init
    } 
  switch (whatIsMod) {
    case "Alignment":
        c.alignID = value;
      break;
    case "Race":
        c.raceID = value;
      break;
    case "Hit Points":
        c.charHP = value;
      break;
    case "Initiative":
        c.init = value;
      break;
    default:
      break;
  }
  return c;
};
