import axios from "axios";
import { Modifier } from "../interfaces/modifier";
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
    const saveData = body;
    return await axios
        .put(`${siteHost}/api/saves/updates/${charId}`, saveData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}
export const deleteSavesLine = async (charId: string, id:string) => {
    return await axios
        .delete(`${siteHost}/api/saves/${charId}/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}