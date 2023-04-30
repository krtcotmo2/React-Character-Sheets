import axios from "axios";
import { Spell } from "../interfaces/spell";

export const getCharacterSpells = async (charId: string) => {
    return await axios
    .get(`http://localhost:3001/api/spells/char/${charId}`)
    .then(results => results.data as Spell[])
    .catch((err) => {
        throw new Error(err.message);
    });
}