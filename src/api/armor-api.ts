import axios from "axios";
import { ArmorSet } from "../interfaces/armor";

export const getCharacterArmor = async (charId: string) => {
    return await axios
    .get(`http://localhost:3001/api/armor/char/${charId}`)
    .then(results => results.data as ArmorSet[])
    .catch((err) => {
        throw new Error(err.message);
    });
}