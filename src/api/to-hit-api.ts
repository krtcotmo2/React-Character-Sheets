import axios from "axios";
import { Modifier } from "../interfaces/modifier";
import { httpDelete, httpGet, httpPut } from "./http-calls";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;


export const getCharacterToHits = async (charId: string) => {
    const url = `/api/to-hit/${charId}`;
    return await httpGet(url)
        .then(data => {
            return data
        }).catch((err) => {
            throw new Error(err.message);
        });
}

export const pinToHit = async (charId: string, id:string) => {
    const url = `/api/to-hit/char/${charId}/pin/${id}`;
    return await httpPut(url,{})
        .then(results => results)
        .catch((err) => { throw new Error(err.message);});
}

export const unpinToHit = async (charId: string, id:string) => {
    const url = `/api/to-hit/char/${charId}/unpin/${id}`;
    return await httpPut(url,{})
        .then(results => results)
        .catch((err) => { throw new Error(err.message);});
}

export const updateToHitLines = async (charId: string, body:Modifier[]) => {
    const url = `/api/to-hit/updates/${charId}`;
    return await httpPut(url,body)
        .then(results => results)
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
    const url = `/api/to-hit/${charId}/${id}`;
    return await httpDelete(url)
        .then(results => {
            return results
        })
        .catch((err) => {
            throw new Error(err.message);
        });
}