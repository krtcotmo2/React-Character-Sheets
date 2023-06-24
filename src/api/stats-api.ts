// /api/stat


import axios from "axios";

export const saveStatLine = async (charId: string, body:any) => {
    const statData = body;
    return await axios
        .post(`http://localhost:3001/api/stat/${charId}`, statData)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const deleteStatLine = async (charId: string, id:string) => {
    return await axios
        .delete(`http://localhost:3001/api/stat/${charId}/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}