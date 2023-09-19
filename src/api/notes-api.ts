import axios from "axios";
import { Note, NoteItem } from "../interfaces/note";
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

export const sendNewNote = async (note: Note, charId: string) => {
    return await axios
    .post(`${siteHost}/api/notes/note/${charId}`, note)
    .then(results => results.data as Note[])
    .catch((err) => {
        throw new Error(err.message);
    });
}

export const sendNewNoteDetail = async (note: NoteItem, charId: number) => {
    return await axios
    .post(`${siteHost}/api/notes/noteItem/${charId}`, note)
    .then(results => results.data as NoteItem[])
    .catch((err) => {
        throw new Error(err.message);
    });
}

export const sendUpdateNotes = async (note: NoteItem[], charId: number) => {
    return await axios
    .put(`${siteHost}/api/notes/note/${charId}`, note)
        .then(results => {
            console.log(`updated ${note[0].id}`)
            return results.data as Note[];
        })
        .catch((err) => {
            throw new Error(err.message);
        });
}