import axios from "axios";
import { Modifier } from "../interfaces/modifier";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;


export const getCharacterToHits = async (charId: string) => {
    return await axios
    .get(`${siteHost}/api/to-hit/${charId}`)
    .then(results => results.data)
    .catch((err) => {
        throw new Error(err.message);
    });
}

export const pinToHit = async (charId: string, id:string) => {
    return await axios
        .put(`${siteHost}/api/to-hit/char/${charId}/pin/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const unpinToHit = async (charId: string, id:string) => {
    return await axios
        .put(`${siteHost}/api/to-hit/char/${charId}/unpin/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const updateToHitLines = async (charId: string, body:Modifier[]) => {
    const saveData = body;
    return await axios
        .put(`${siteHost}/api/to-hit/updates/${charId}`, saveData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const saveToHitLine = async (charId: string, body:any) => {
    const statData = body;
    return await axios
        .post(`${siteHost}/api/to-hit/${charId}`, statData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const saveToHitCategory = async (charId: string, body:any) => {
    const statData = body;
    return await axios
        .post(`${siteHost}/api/to-hit/new-to-hit/${charId}`, statData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const deleteToHitLine = async (charId: string, id:string) => {
    return await axios
        .delete(`${siteHost}/api/to-hit/${charId}/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}