import { CharLevel } from "../../../interfaces/levels";
import { getChar } from "../../../api/character-api";

export const loadChar = async (charId: string) => {
    const searchParam = charId;
    if(charId.trim() === '' || +charId < 1){ 
        throw new Error('invalid_id');
    }
    return await getChar(searchParam)
        .catch( err => {
            throw err;
        });
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
export const checkForCaster = (levels: CharLevel[] | undefined): boolean => {
    if(!levels){
        return false;
    }
    const casters = ['Druid', 'Cleric', 'Paladin', 'Ranger', 'Sorcerer', 'Sorceress', 'Wizard', 'Magus'];
    const arr = casters.map(caster => {
        return levels.some(lvl => lvl.className === caster);
    });
    return arr.some(isCaster => isCaster);

}