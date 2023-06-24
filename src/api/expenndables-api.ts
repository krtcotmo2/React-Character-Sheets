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