import axios from "axios";

export const getAllCharacters = async () => {
    const allCharacters = await axios
    .get(`http://localhost:3001/api/character/with-levels/`)
    .catch((err) => {
        throw new Error(err.message);
    });
    return allCharacters?.data;
}