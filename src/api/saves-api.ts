import axios from "axios";
import { Modifier } from "../interfaces/modifier";
import { httpDelete, httpPut } from "./http-calls";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;


export const saveSavesLine = async (charId: string, body:any) => {
    const statData = body;
    return await axios
        .post(`${siteHost}/api/saves/${charId}`, statData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}
export const updateSavesLines = async (charId: string, body:Modifier[]) => {
    const url = `/api/saves/updates/${charId}`;
    return await httpPut(url, body)
        .then(results => {
            return results
        })
        .catch((err) => {
            throw new Error(err.message);
        });
}
export const deleteSavesLine = async (charId: string, id:string) => {
    const url = `/api/saves/${charId}/${id}`;
    return await httpDelete(url)
        .then(results => {
            return results;
        })
        .catch((err) => {
            throw new Error(err.message);
        });
}