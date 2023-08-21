import { ModifierType } from "../../../enum/modifier-type";
import { ArmorSet } from "../../../interfaces/armor";
import { Modifier } from "../../../interfaces/modifier";

export const addStatsToArmor = (armors: ArmorSet[], dex: number) => {
    return armors.forEach(armor => {
        const dexBonus = Math.floor((dex-10)/2);
        armor.score += 10;
        if(!armor.name.toLowerCase().includes('flat')){
            armor.score += dexBonus;
            armor.values = [
                {
                    id: 0,
                    modDesc: 'Dex',
                    score: dexBonus,
                    type: ModifierType.MODIFIER,
                    aidsFlatfoot: false,
                    aidsTouchAttach: true,
                },
                ...armor.values
            ];
        }
        armor.values = [
            {
                id: 0,
                modDesc: 'Base',
                score: 10,
                type: ModifierType.MODIFIER,
                aidsFlatfoot: true,
                aidsTouchAttach: true,
            },
            ...armor.values
        ];
        
    })

}

export const getTouchAC = (mods: Modifier[]) => {
    return mods.reduce((orig, mod) => orig + (mod.aidsTouchAttach ? mod.score : 0), 0 );
}
export const getFFAC = (mods: Modifier[]) => {
    return mods.reduce((orig, mod) => orig + (mod.aidsFlatfoot ? mod.score : 0), 0 );
}