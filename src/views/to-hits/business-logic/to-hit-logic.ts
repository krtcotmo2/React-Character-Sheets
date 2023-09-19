import _ from "lodash";
import { ToHit, ToHitGroup } from "../../../interfaces/to-hit";
import { ModifierType } from "../../../enum/modifier-type";

export const formatToHits = (hits: ToHit[]) => {
    const grps: ToHitGroup[] = getToHitGroups(hits);
    grps.forEach(grp => {
        grp.value = hits.filter(h => h.toHitID === grp.id)
            .reduce( (orig, h) => orig + h.score, 0)
            grp.breakdown = hits.filter(h => h.toHitID === grp.id)
                .map(h => {
                return {
                    id: +h.id,
                    score: h.score,
                    type: ModifierType.MODIFIER,
                    modDesc: h.modDesc,
                }
        });
    });
    return grps;
}

export const getToHitGroups = (hits: ToHit[]): ToHitGroup[] => {
    const uniqueHits = _.uniqBy(hits, 'toHitID');
    const categories = uniqueHits.map( (hit: ToHit): ToHitGroup => {
        return {
            value: 0,
            breakdown: [],
            hitName: hit.hitName,
            id: hit.toHitID,
            pinned: hit.pinned,
            isMelee: hit.isMelee,
            damage: hit.damage,
            critDamage: hit.critDamage,
            critRange: hit.critRange,
        }
    })
    return categories;
}