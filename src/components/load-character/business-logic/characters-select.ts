import { getAllCharacters } from "../../../api/character-api";

export const loadCharacters = async () => {
    return await getAllCharacters();
}