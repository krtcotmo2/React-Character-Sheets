import axios from "axios";
import { CharLevel } from "../../../interfaces/levels";

export const getChar = async (charId: string) => {
    const searchParam = charId;
    if(charId.trim() === '' || +charId < 1){ 
        throw new Error('invalid_id');
    }
    const aCharacter = await axios
        .get(`http://localhost:3001/api/character/with-calc-stats/${searchParam}`)
        .catch((err) => {
            if(err.response.data.message === 'Character Not Found'){
                return;
            }else if(err.response.data.message === 'stat_not_found'){
                throw new Error(err.response.data.message);
            }else{
                throw new Error(err);
            }

        });
    if (!aCharacter) {
        throw new Error('char_not_found');
    }
    return aCharacter.data;
  };

  export const buildLevelString = (lvls: CharLevel[] | undefined) => {
    if(!lvls){
        return '';
    }
    const a = lvls.map(lvl => {
        return `${lvl.className} - ${lvl.classLevel.toString()}`
    })
    return a.join(', ')

}