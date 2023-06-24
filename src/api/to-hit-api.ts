import axios from "axios";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;


export const getCharacterToHits = async (charId: string) => {
    return await axios
    .get(`${siteHost}/api/to-hit/${charId}`)
    .then(results => results.data)
    .catch((err) => {
        throw new Error(err.message);
    });
}

export const pinToHit = async (charId: string, id:string) => {
    return await axios
        .put(`${siteHost}/api/to-hit/char/${charId}/pin/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const unpinToHit = async (charId: string, id:string) => {
    return await axios
        .put(`${siteHost}/api/to-hit/char/${charId}/unpin/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}