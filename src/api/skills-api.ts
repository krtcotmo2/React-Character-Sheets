import axios from "axios";

export const pinSkill = async (charId: string, id:string) => {
    return await axios
        .put(`http://localhost:3001/api/skill/char/${charId}/pin/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const unpinSkill = async (charId: string, id:string) => {
    return await axios
        .put(`http://localhost:3001/api/skill/char/${charId}/unpin/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}