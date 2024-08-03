import axios from "axios";
import { Equipment, EquipmentData } from "../interfaces/equipment";
import { httpDelete, httpGet, httpPut } from "./http-calls";

const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;

export const getCharacterEquipment = async (charId: string) => {
    const url = `/api/equipment/${charId}`;
    return await httpGet(url)
        .then(data => {
            return data as EquipmentData
        }).catch((err) => {
            throw new Error(err.message);
        });
}

export const updateCharacterEquipment = async (charId: string, equip:Equipment) => {
    const url = `/api/equipment/${equip.id}`;
    return await httpPut(url, equip)
        .then(results => {
            return results as EquipmentData
        })
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const createCharacterEquipment = async (charId: string, equip:Equipment) => {
    return await axios
        .post(`${siteHost}/api/equipment/char/${charId}`, equip)
        .then(results => results.data as EquipmentData)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const deleteCharacterEquipment = async (expId:string, charId: string) => {
    const url = `/api/equipment/${charId}/${expId}`;
    return await httpDelete(url)
        .then(results => {
            return results as Equipment[];
        })
        .catch((err) => {
            throw new Error(err.message);
        });
}