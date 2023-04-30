import _ from "lodash";
import { Skill, RawSkill } from "../../../interfaces/skills";
import { ModifierType } from "../../../enum/modifier-type";


export const formatSkills = (skls: RawSkill[]) => {
    const grps: Skill[] = getSkillGroups(skls);
    grps.forEach(skl => {
        skl.value = skls.filter(s => s.skillID === skl.skillID)
            .reduce( (orig, s) => orig + s.score, 0)
        skl.breakdown = skls.filter(s => s.skillID === skl.skillID)
                .map(s => {
                return {
                    id: +s.id,
                    score: s.score,
                    type: s.isMod ? ModifierType.MODIFIER : 
                        s.isRanks ? ModifierType.BASE : 
                        ModifierType.CLASSSKILL,
                    modDesc: s.modDesc,
                }
        });
    });
    return grps;
}

export const getSkillGroups = (skls: RawSkill[]): Skill[] => {
    const uniqueSkills = _.uniqBy(skls, 'skillID');
    const categories = uniqueSkills.map( (skil: RawSkill): Skill => {
        return {
            value: 0,
            breakdown: [],
            skillName: skil.skillName,
            skillID: skil.skillID,
            pinned: skil.pinned,            
        }
    })
    return categories;
} 