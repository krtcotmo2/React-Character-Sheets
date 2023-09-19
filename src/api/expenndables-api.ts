import axios from "axios";
import { Expendable } from "../interfaces/expendable";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;

export const getCharacterExpendables = async (charId: string) => {
    return await axios
    .get(`${siteHost}/api/expendable/char/${charId}`)
    .then(results => results.data as Expendable[])
    .catch((err) => {
        throw new Error(err.message);
    });
}

export const updateCharacterExpendables = async (charId: string, exp:Expendable) => {
    return await axios
        .put(`${siteHost}/api/expendable/${exp.id}`, exp)
        .then(results => results.data as Expendable[])
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const createCharacterExpendables = async (exp:Expendable) => {
    return await axios
        .post(`${siteHost}/api/expendable/`, exp)
        .then(results => results.data as Expendable[])
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const deleteCharacterExpendables = async (expId:string, charId: string) => {
    return await axios
        .delete(`${siteHost}/api/expendable/${charId}/${expId}`)
        .then(results => results.data as Expendable[])
        .catch((err) => {
            throw new Error(err.message);
        });
}