import axios from "axios";

export const getCharacterToHits = async (charId: string) => {
    return await axios
    .get(`http://localhost:3001/api/to-hit/${charId}`)
    .then(results => results.data)
    .catch((err) => {
        throw new Error(err.message);
    });
}