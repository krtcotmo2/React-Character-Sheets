import axios from "axios";
import { Modifier } from "../interfaces/modifier";
import { Character } from "../interfaces/character";
import { store } from "../redux/configure-store";
import { SavesActions } from "../redux/reducers/saves-reducer";
import { StatsActions } from "../redux/reducers/stats-reducer";
import { ToHitActions } from "../redux/reducers/to-hit-reducer";
import { httpDelete, httpGet, httpPut } from "./http-calls";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;


export const pinSkill = async (charId: string, id:string) => {
    const url = `/api/skill/char/${charId}/pin/${id}`;
    return await httpPut(url,{})
        .then(results => results)
        .catch((err) => { throw new Error(err.message);});
}

export const unpinSkill = async (charId: string, id:string) => {
    const url = `/api/skill/char/${charId}/unpin/${id}`;
    return await httpPut(url,{})
        .then(results => results)
        .catch((err) => { throw new Error(err.message);});
}

export const updateSkillLines = async (charId: string, body:Modifier[]) => {
    const url = `/api/skill/updates/${charId}`;
    return await httpPut(url, body)
        .then(results => results)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const getAllSkills = async (charId: string) => {
    const url = `/api/skill/char/${charId}`;
    return await httpGet(url)
        .then(data => {
            return data;
        }).catch((err) => {
            throw new Error(err.message);
        });
}

export const updateReducersAfterCharUpdates = async (char: Character) => {
    if(char.toHitGroups){
        await store.dispatch(ToHitActions.setToHitGroups(char.toHitGroups));
    }
    if(char.saves){
        await store.dispatch(SavesActions.setSaves(char.saves));
    }
    if(char.stats){
        await store.dispatch(StatsActions.setStat(char.stats));
    }
}

export const saveSkillLine = async (charId: string, body:any) => {
    const statData = body;
    return await axios
        .post(`${siteHost}/api/skill/${charId}`, statData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const deleteSkillLines = async (charId: string, id:string) => {
    const url = `/api/skill/${charId}/${id}`;
    return await httpDelete(url)
        .then(results => {
            return results;
        })
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const saveNewSkill= async (charId: string, body:any) => {
    const statData = body;
    return await axios
        .post(`${siteHost}/api/skill/new-skill/${charId}`, statData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}
