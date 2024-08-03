import axios from "axios";
import { Note, NoteItem } from "../interfaces/note";
import { httpDelete, httpGet, httpPut } from "./http-calls";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;


export const getCharacterNotes = async (charId: string) => {
    const url = `/api/notes/char/${charId}`;
    return await httpGet(url)
        .then(data => {
            return data as Note[]
        }).catch((err) => {
            throw new Error(err.message);
        });
}

export const deleteCharacterNotes = async (noteId: string, charId: string) => {
    const url = `/api/notes/${noteId}/${charId}`;
    return await httpDelete(url)
        .then(results => {
            return results as Note[];
        })
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
    const url = `/api/notes/note/${charId}`;
    return await httpPut(url, note).then(results => {
        return results;
    })
    .catch((err) => {
        throw new Error(err.message);
    });
}