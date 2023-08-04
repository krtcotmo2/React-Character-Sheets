import { ModifierType } from "../../../enum/modifier-type";
import { ArmorSet } from "../../../interfaces/armor";

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
            },
            ...armor.values
        ];
        
    })

}