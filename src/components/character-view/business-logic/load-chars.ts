import axios from "axios";

export const getChar = async (charId: string) => {
    const searchParam = charId;
    if(charId.trim() === '' || +charId < 1){ 
        throw new Error('invalid_id');
    }
    const aCharacter = await axios
        .get(`http://localhost:3001/api/character/with-stats/${searchParam}`)
        .catch((err) => {
            throw new Error(err.message);
        });
    if (!aCharacter) {
        throw new Error('char_not_found');
    }
    return aCharacter.data;
  };