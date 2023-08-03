import { Character, UpdateCharacter } from "../../../interfaces/character";
import { getAlignment, getRaces } from "../../../enum/coreVals";

export const buildChar = (
  char: Character,
  whatIsMod: string,
  value: string
) => {
  const c: UpdateCharacter = {
    charID: char.charID,
    alignID: getAlignment(char.alignment),
    raceID: getRaces(char.race),
    charHP: char.charHP,
    charName: char.charName,
    image: char.image,
    init: char.init,
  };
  switch (whatIsMod) {
    case "Alignment":
      c.alignID = +value;
      break;
    case "Race":
      c.raceID = +value;
      break;
    case "Hit Points":
      c.charHP = +value;
      break;
    case "Initiative":
      c.init = +value;
      break;
    case "Name":
      c.charName = value;
      break;
    case "Image":
      c.image = value;
      break;
    default:
      break;
  }
  return c;
};
