import axios from "axios";
import { ArmorGrouping, ArmorSet } from "../interfaces/armor";
import { Modifier } from "../interfaces/modifier";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;

export const getCharacterArmor = async (charId: string) => {
    return await axios
        .get(`${siteHost}/api/armor/char/${charId}`)
        .then(results => results.data as ArmorSet[])
        .catch((err) => {
            throw new Error(err.message);
        });
}
export const createArmorGrouping = async (charId: number, body: ArmorGrouping) => {
    return await axios
        .post(`${siteHost}/api/armor/char/${charId}`, {...body})
        .then(results => results.data as ArmorSet[])
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const updateArmorLines = async (charId: string, body:Modifier[]) => {
    const saveData = body;
    return await axios
        .put(`${siteHost}/api/armor/updates/${charId}`, saveData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const saveArmorLine = async (charId: string, body:any) => {
    const saveData = body;
    return await axios
        .post(`${siteHost}/api/armor/${charId}`, saveData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const deleteArmorLine = async (charId: string, acID: string) => {
    return await axios
        .delete(`${siteHost}/api/armor/${charId}/${acID}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}