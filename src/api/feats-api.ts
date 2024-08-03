import axios from "axios";
import { Feat } from "../interfaces/feats";
import { httpGet } from "./http-calls";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;
    
export const getCharacterFeats = async (charId: string) => {
    const url = `/api/feat/char/${charId}`;
    return await httpGet(url)
        .then(data => {
            return data as Feat[]
        }).catch((err) => {
            throw new Error(err.message);
        });
}

export const getFeatsType = async () => {
    const url = `/api/feat/type`;
    return await httpGet(url)
        .then(data => {
            return data;
        }).catch((err) => {
            throw new Error(err.message);
        });
}
export const getFeatsOfType = async ( typ: string) => {
    const url = `/api/feat/type/${typ}`;
    return await httpGet(url)
        .then(data => {
            return data;
        }).catch((err) => {
            throw new Error(err.message);
        });
}
export const saveNewFeat = async ( charId: string, featId: string) => {
    return await axios
    .post(`${siteHost}/api/feat/new/${charId}/${featId}`)
    .then(results => results.data)
    .catch((err) => {
        throw new Error(err.message);
    });
}

