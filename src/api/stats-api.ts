
import axios from "axios";
import { Modifier } from "../interfaces/modifier";
import { httpDelete, httpPut } from "./http-calls";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;


export const saveStatLine = async (charId: string, body:any) => {
    const statData = body;
    return await axios
        .post(`${siteHost}/api/stat/${charId}`, statData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const updateStatLines = async (charId: string, body:Modifier[]) => {
    const url = `/api/stat/updates/${charId}`;
    return await httpPut(url, body);
}

export const deleteStatLine = async (charId: string, id:string) => {
    const url = `/api/stat/${charId}/${id}`;
    return await httpDelete(url)
        .then(results => {
            return results;
        })
        .catch((err) => {
            throw new Error(err.message);
        });
}