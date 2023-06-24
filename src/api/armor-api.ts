import axios from "axios";
import { ArmorSet } from "../interfaces/armor";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;

    export const getCharacterArmor = async (charId: string) => {
    return await axios
    .get(`${siteHost}/api/armor/char/${charId}`)
    .then(results => results.data as ArmorSet[])
    .catch((err) => {
        throw new Error(err.message);
    });
}