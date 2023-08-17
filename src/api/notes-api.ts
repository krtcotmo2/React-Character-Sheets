import axios from "axios";
import { Note } from "../interfaces/note";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;


export const getCharacterNotes = async (charId: string) => {
    return await axios
    .get(`${siteHost}/api/notes/char/${charId}`)
    .then(results => results.data as Note[])
    .catch((err) => {
        throw new Error(err.message);
    });
}

export const deleteCharacterNotes = async (noteId: string, charId: string) => {
    return await axios
    .delete(`${siteHost}/api/notes/${noteId}/${charId}`)
    .then(results => results.data as Note[])
    .catch((err) => {
        throw new Error(err.message);
    });
}