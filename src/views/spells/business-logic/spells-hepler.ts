import _ from "lodash";
import { Spell, SpellLevelCategory } from "../../../interfaces/spell";
import { Stat } from "../../../interfaces/stat";
import { useSelector } from "react-redux";
import { store } from "../../../redux/configure-store";
import { CharLevel } from "../../../interfaces/levels";

export const organizeSpellList = (list: Spell[], mod: number) => {
    const categories = getSpellGroups(list, mod);
    fillCategories(list, categories);
    return categories;
}

export const getSpellGroups = (list: Spell[], mod: number): SpellLevelCategory[] => {
    // const charStats: Stat = useSelector(state => store.getState().stats);
    // const charLevels: CharLevel[] = useSelector(state => store.getState().levels);

    // const isIntBased = charLevels.some(charLvl => charLvl.className === 'Magus') || 
    // charLevels.some(charLvl => charLvl.className === 'Wizard');


    const categories: SpellLevelCategory[] = []
    const lvls: number[] = _.uniq(_.map(list, 'spellLevel'));
    lvls.forEach( lvl => {
        categories.push(
            {
                spellLevel: lvl,
                quantity: list.filter(spell => spell.spellLevel === lvl).length,
                cast: list.filter(spell => spell.spellLevel === lvl && spell.isCast).length,
                dcCheck: 10 + lvl + mod,
                spells: [],
            }
        )
    });
    return categories;
}

export const fillCategories = (list: Spell[], cats: SpellLevelCategory[]) => {
    cats.forEach(cat => {
        cat.spells = [...list.filter(spell => spell.spellLevel === cat.spellLevel)];
    })
    return cats;
}

export const getStaModifier = (lvls: CharLevel[], stats: Stat | undefined): number => {
    if(!stats){
        return 0;
    }
    let mod = 0;
    if(
        lvls.some(lvl => lvl.className === 'Wizard') || 
        lvls.some(lvl => lvl.className === 'Magus')  || 
        lvls.some(lvl => lvl.className === 'Witch') 
    ){
        mod = Math.floor((stats.int.value -10) /2);
    }else if(
        lvls.some(lvl => lvl.className === 'Cleric') || 
        lvls.some(lvl => lvl.className === 'Druid') || 
        lvls.some(lvl => lvl.className === 'Ranger') || 
        lvls.some(lvl => lvl.className === 'Inquisitor') 
    ){
        mod = Math.floor((stats.wis.value -10) /2);
    }else if(
        lvls.some(lvl => lvl.className === 'Bard') || 
        lvls.some(lvl => lvl.className === 'Paladin') || 
        lvls.some(lvl => lvl.className === 'Sorcerer') || 
        lvls.some(lvl => lvl.className === 'Sorceress') || 
        lvls.some(lvl => lvl.className === 'Omdura') || 
        lvls.some(lvl => lvl.className === 'Oracle') || 
        lvls.some(lvl => lvl.className === 'Summoner') 
    ){
        mod = Math.floor((stats.chr.value -10) /2);
    }
    return mod;
}