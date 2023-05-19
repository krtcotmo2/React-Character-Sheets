import _ from "lodash";
import { Spell, SpellLevelCategory } from "../../../interfaces/spell";
import { Stat } from "../../../interfaces/stat";
import { useSelector } from "react-redux";
import { store } from "../../../redux/configure-store";
import { CharLevel } from "../../../interfaces/levels";

export const organizeSpellList = (list: Spell[]) => {
    const categories = getSpellGroups(list);
    fillCategories(list, categories);
    return categories;
}

export const getSpellGroups = (list: Spell[]): SpellLevelCategory[] => {
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
                dcCheck: 10 + lvl + 1,
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