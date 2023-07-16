import axios from "axios";
import { Modifier } from "../interfaces/modifier";
import { Character } from "../interfaces/character";
import { store } from "../redux/configure-store";
import { SavesActions } from "../redux/reducers/saves-reducer";
import { StatsActions } from "../redux/reducers/stats-reducer";
import { ToHitActions } from "../redux/reducers/to-hit-reducer";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;


export const pinSkill = async (charId: string, id:string) => {
    return await axios
        .put(`${siteHost}/api/skill/char/${charId}/pin/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const unpinSkill = async (charId: string, id:string) => {
    return await axios
        .put(`${siteHost}/api/skill/char/${charId}/unpin/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const updateSkillLines = async (charId: string, body:Modifier[]) => {
    const saveData = body;
    return await axios
        .put(`${siteHost}/api/skill/updates/${charId}`, saveData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const getAllSkills = async (charId: string) => {
    return await axios
        .get(`${siteHost}/api/skill/char/${charId}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const updateReducersAfterCharUpdates = async (c: Character) => {
    if(c.toHitGroups){
        await store.dispatch(ToHitActions.setToHitGroups(c.toHitGroups));
    }
    if(c.saves){
        await store.dispatch(SavesActions.setSaves(c.saves));
    }
    if(c.stats){
        await store.dispatch(StatsActions.setStat(c.stats));
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
    return await axios
        .delete(`${siteHost}/api/skill/${charId}/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}