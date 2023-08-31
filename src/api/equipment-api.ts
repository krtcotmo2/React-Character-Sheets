import axios from "axios";
import { Equipment, EquipmentData } from "../interfaces/equipment";

const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;

export const getCharacterEquipment = async (charId: string) => {
    return await axios
    .get(`${siteHost}/api/equipment/${charId}`)
    .then(results => results.data as EquipmentData)
    .catch((err) => {
        throw new Error(err.message);
    });
}

export const updateCharacterEquipment = async (charId: string, exp:Equipment) => {
    return await axios
        .put(`${siteHost}/api/equipment/${exp.id}`, exp)
        .then(results => results.data as Equipment[])
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const createCharacterEquipment = async (exp:Equipment) => {
    return await axios
        .post(`${siteHost}/api/equipment/`, exp)
        .then(results => results.data as Equipment[])
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const deleteCharacterEquipment = async (expId:string, charId: string) => {
    return await axios
        .delete(`${siteHost}/api/equipment/${charId}/${expId}`)
        .then(results => results.data as Equipment[])
        .catch((err) => {
            throw new Error(err.message);
        });
}