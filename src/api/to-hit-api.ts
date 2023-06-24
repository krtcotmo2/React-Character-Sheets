import axios from "axios";

export const getCharacterToHits = async (charId: string) => {
    return await axios
    .get(`http://localhost:3001/api/to-hit/${charId}`)
    .then(results => results.data)
    .catch((err) => {
        throw new Error(err.message);
    });
}

export const pinToHit = async (charId: string, id:string) => {
    return await axios
        .put(`http://localhost:3001/api/to-hit/char/${charId}/pin/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const unpinToHit = async (charId: string, id:string) => {
    return await axios
        .put(`http://localhost:3001/api/to-hit/char/${charId}/unpin/${id}`)
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}