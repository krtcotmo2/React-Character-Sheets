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

export const updateSpell = async (spellId: string, spell: Spell) => {
    return await axios
    .put(`${siteHost}/api/spells/${spellId}`, spell)
    .then(results => results.data as Spell)
    .catch((err) => {
        throw new Error(err.message);
    });
}

export const deleteSelectedSpell = async (spellId: string) => {
    return await axios
    .delete(`${siteHost}/api/spells/${spellId}`)
    .catch((err) => {
        throw new Error(err.message);
    });
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