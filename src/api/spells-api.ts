import axios from "axios";
import { Spell } from "../interfaces/spell";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;


export const getCharacterSpells = async (charId: string) => {
    return await axios
    .get(`${siteHost}/api/spells/char/${charId}`)
    .then(results => results.data as Spell[])
    .catch((err) => {
        throw new Error(err.message);
    });
}