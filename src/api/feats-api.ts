import axios from "axios";
import { Feat } from "../interfaces/feats";

export const getCharacterFeats = async (charId: string) => {
    return await axios
    .get(`http://localhost:3001/api/feat/char/${charId}`)
    .then(results => results.data as Feat[])
    .catch((err) => {
        throw new Error(err.message);
    });
}