import { getFeatsOfType, getFeatsType, saveNewFeat } from "../../../api/feats-api"

export const loadFeatTypes = async () => {
    const types = await getFeatsType();
    return types
}

export const loadFeatOfTypes = async (typ: string) => {
    const feats = await getFeatsOfType(typ);
    return feats;
}

export const createFeat = async (charId: string, featId: string) => {
    return await saveNewFeat(charId, featId);
}