
import axios from "axios";
import { Modifier } from "../interfaces/modifier";
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
    const statData = body;
    return await axios
        .put(`${siteHost}/api/stat/updates/${charId}`, statData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const deleteStatLine = async (charId: string, id:string) => {
    return await axios
        .delete(`${siteHost}/api/stat/${charId}/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}