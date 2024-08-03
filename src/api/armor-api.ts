import axios from "axios";
import { ArmorGrouping, ArmorSet } from "../interfaces/armor";
import { Modifier } from "../interfaces/modifier";
import { httpDelete, httpGet, httpPut } from "./http-calls";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;

export const getCharacterArmor = async (charId: string) => {
    const url = `/api/armor/char/${charId}`;
    return await httpGet(url)
        .then(data => {
            return data as ArmorSet[]
        }).catch((err) => {
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
    const url = `/api/armor/updates/${charId}`;
    return await httpPut(url, body)
        .then(results => results)
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
    const url = `/api/armor/${charId}/${acID}`;
    return await httpDelete(url)
        .then(results => {
            return results;
        })
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const pinArmor = async (charId: string, id:string) => {
   const url = `/api/armor/char/${charId}/pin/${id}`;
    return await httpPut(url,{})
        .then(results => results)
        .catch((err) => { throw new Error(err.message);});
}

export const unpinArmor = async (charId: string, id:string) => {
    const url = `/api/armor/char/${charId}/unpin/${id}`;
    return await httpPut(url,{})
        .then(results => results)
        .catch((err) => { throw new Error(err.message);});
}