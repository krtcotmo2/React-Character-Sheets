import axios from "axios";
import { Spell } from "../interfaces/spell";
import { httpDelete, httpGet, httpPut } from "./http-calls";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;


export const getCharacterSpells = async (charId: string) => {
    const url = `/api/spells/char/${charId}`;
    return await httpGet(url)
        .then(data => {
            return data as Spell[]
        }).catch((err) => {
            throw new Error(err.message);
        });
}

export const updateSpell = async (spellId: string, spell: Spell) => {
    const url = `/api/spells/${spellId}`;
    return await httpPut(url, spell)
        .then(results => results as Spell)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const deleteSelectedSpell = async (spellId: string) => {
    const url = `/api/spells/${spellId}`;
    return await httpDelete(url)
        .then(results => results)
        .catch((err) => {throw new Error(err.message);});
}

export const createNewSpell = async (charId: string, spell: Spell) => {
    const spellData = {
        ...spell,
        id: 0,
        charID: +spell.charID
    }
    return await axios
    .post(`${siteHost}/api/spells/char/${charId}`, spellData)
    .then(results => results.data as Spell[])
    .catch((err) => {
        throw new Error(err.message);
    });
}