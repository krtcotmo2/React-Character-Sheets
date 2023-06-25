import axios from "axios";
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

export const getAllSkills = async (charId: string) => {
    return await axios
        .get(`${siteHost}/api/skill/char/${charId}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}