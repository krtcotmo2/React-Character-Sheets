import { deleteSavesLine } from "../../../api/saves-api";
import { deleteStatLine } from "../../../api/stats-api";
import { store } from "../../../redux/configure-store";
import { SavesActions } from "../../../redux/reducers/saves-reducer";
import { StatsActions } from "../../../redux/reducers/stats-reducer";

export const removeTempBonus = (guid: string, reducer?: string) => {
    console.log(reducer, guid);
    
    switch(reducer){
        case 'saves':
            removeSaveBonus(guid);
            break;
        case 'stats':
            removeStatsBonus(guid);
            break;
        default:
            break;

    }
}

export const removeSaveBonus = (guid: string) => {
    // store.dispatch(SavesActions.removeBonus(guid));
    const charId = store.getState().character.charID;
    deleteSavesLine(charId.toString(), guid).then(arg => {
        store.dispatch(SavesActions.setSaves(arg.saves));
    })
} 

export const removeStatsBonus = (guid: string) => {
    const charId = store.getState().character.charID;
    // store.dispatch(StatsActions.removeBonus(guid));
    // store.dispatch(SavesActions.resetSaves(store.getState().stats));
    deleteStatLine(charId.toString(), guid).then(arg => {
        store.dispatch(StatsActions.setStat(arg.stats));
        store.dispatch(SavesActions.setSaves(arg.saves));

    }     
    );
} 


