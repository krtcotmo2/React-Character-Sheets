import axios from "axios";
import { SaveLevel } from "../interfaces/levels";
import { httpDelete } from "./http-calls";

const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;

export const saveALevel = async (body:SaveLevel) => {
    const levelData = body;
    return await axios
        .post(`${siteHost}/api/levels/save`, levelData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const deleteLevel = async (levelId:number) => {
    const url = `/api/levels/delete/${levelId}`;
    return await httpDelete(url)
        .then(results => {
            return results;
        })
        .catch((err) => {
            throw new Error(err.message);
        });
}