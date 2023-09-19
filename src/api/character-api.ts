import axios from "axios";
import { Character, SaveCharacter, UpdateCharacter } from "../interfaces/character";
import { formatToHits } from "../views/to-hits/business-logic/to-hit-logic";

const siteHost: string =
  process.env.REACT_APP_NODE_MODE === "development"
    ? `http://localhost:3001`
    : `https://nest-typeorm.herokuapp.com`;

export const getAllCharacters = async () => {
  const allCharacters = await axios
    .get(`${siteHost}/api/character/with-levels/`)
    .catch((err) => {
      throw new Error(err.message);
    });
  return allCharacters?.data;
};

export const getChar = async (charId: string) => {
  const searchParam = charId;
  if (charId.trim() === "" || +charId < 1) {
    throw new Error("invalid_id");
  }
  const aCharacter = await axios
    .get(`${siteHost}/api/character/with-calc-stats/${searchParam}`)
    .then((char) => {
      char.data.toHitGroups = formatToHits(char.data.toHitGroups);
      return char;
    })
    .catch((err) => {
      if (err.response.data.message === "Character Not Found") {
        return;
      } else if (err.response.data.message === "stat_not_found") {
        throw new Error(err.response.data.message);
      } else {
        throw new Error(err);
      }
    });
  if (!aCharacter) {
    throw new Error("char_not_found");
  }
  return aCharacter.data;
};

export const saveCharacter = async (char: SaveCharacter) => {
  const allCharacters = await axios
    .post(`${siteHost}/api/character/create`, { ...char })
    .catch((err) => {
      throw new Error(err.message);
    });
  return allCharacters?.data;
};

export const updateCharacter = async (char: UpdateCharacter): Promise<Character> => {
  const updatedChar = await axios
    .put(`${siteHost}/api/character/${char.charID}`, { ...char })
    .catch((err) => {
      throw new Error(err.message);
    });
  return updatedChar?.data;
};
