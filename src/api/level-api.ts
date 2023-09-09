import axios from "axios";
import { SaveLevel } from "../interfaces/levels";

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
    return await axios
        .delete(`${siteHost}/api/levels/delete/${levelId}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}