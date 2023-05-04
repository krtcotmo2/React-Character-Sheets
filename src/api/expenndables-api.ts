import axios from "axios";
import { Expendable } from "../interfaces/expendable";

export const getCharacterExpendables = async (charId: string) => {
    return await axios
    .get(`http://localhost:3001/api/expendable/char/${charId}`)
    .then(results => results.data as Expendable[])
    .catch((err) => {
        throw new Error(err.message);
    });
}