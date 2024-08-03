import axios from "axios";
import { Expendable } from "../interfaces/expendable";
import { httpDelete, httpGet, httpPut } from "./http-calls";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;

export const getCharacterExpendables = async (charId: string) => {
    const url = `/api/expendable/char/${charId}`;
    return await httpGet(url)
        .then(data => {
            return data as Expendable[]
        }).catch((err) => {
            throw new Error(err.message);
        });
}

export const updateCharacterExpendables = async (charId: string, exp:Expendable) => {
    const url = `/api/expendable/${exp.id}`;
    return await httpPut(url, exp)
        .then(results => {
            return results as Expendable[]
        })
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
    const url = `/api/expendable/${charId}/${expId}`;
    return await httpDelete(url)
        .then(results => {
            return results as Expendable[];
        })
        .catch((err) => {
            throw new Error(err.message);
        });
}