import axios from "axios";
import { Note } from "../interfaces/note";

export const getCharacterNotes = async (charId: string) => {
    return await axios
    .get(`http://localhost:3001/api/notes/char/${charId}`)
    .then(results => results.data as Note[])
    .catch((err) => {
        throw new Error(err.message);
    });
}