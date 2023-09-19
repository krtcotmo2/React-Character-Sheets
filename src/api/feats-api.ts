import axios from "axios";
import { Feat } from "../interfaces/feats";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;
    
export const getCharacterFeats = async (charId: string) => {
    return await axios
    .get(`${siteHost}/api/feat/char/${charId}`)
    .then(results => results.data as Feat[])
    .catch((err) => {
        throw new Error(err.message);
    });
}

export const getFeatsType = async () => {
    return await axios
    .get(`${siteHost}/api/feat/type`)
    .then(results => results.data)
    .catch((err) => {
        throw new Error(err.message);
    });
}
export const getFeatsOfType = async ( typ: string) => {
    return await axios
    .get(`${siteHost}/api/feat/type/${typ}`)
    .then(results => results.data)
    .catch((err) => {
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

