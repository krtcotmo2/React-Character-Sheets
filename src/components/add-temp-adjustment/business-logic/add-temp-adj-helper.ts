import { saveSavesLine } from "../../../api/saves-api";
import { saveStatLine } from "../../../api/stats-api";
import { store } from "../../../redux/configure-store";
import { SavesActions } from "../../../redux/reducers/saves-reducer";
import { StatsActions } from "../../../redux/reducers/stats-reducer";
import {v4 as uuidv4} from 'uuid';

export const addTempUpdate = (value: string, reducer: string, stats: string[], description: string) => {
    const charID = store.getState().character.charID;
    const guid = uuidv4();
    switch(reducer){
        case 'saves':
            stats.forEach( stat => {
                // store.dispatch(SavesActions.addAUpdate(+value, stat, description, guid));
                let statId = 1;
                switch(stat){
                    case 'fort':
                        statId = 1;
                        break;
                    case 'reflex':
                        statId = 2;
                        break;
                    case 'will':
                        statId = 3;
                        break;
                    default:
                        break;
                }
                const saveData = {
                    saveID: statId,
                    score: +value,
                    isBase: false,
                    isMod: false,
                    modDesc: description
                }
                saveSavesLine(charID.toString(), saveData).then(arg => {
                    store.dispatch(SavesActions.setSaves(arg.saves));
                });
            })
            break;
        case 'stats':
            stats.forEach( stat => {
                let statId = 1;
                switch(stat){
                    case 'str':
                        statId = 1;
                        break;
                    case 'dex':
                        statId = 2;
                        break;
                    case 'con':
                        statId = 3;
                        break;
                    case 'int':
                        statId = 4;
                        break;
                    case 'wis':
                        statId = 5;
                        break;
                    case 'chr':
                        statId = 6;
                        break;
                    default:
                        break;
                }
                const statData = {
                    statID: statId,
                    score: +value,
                    isBase: false,
                    isMod: false,
                    modDesc: description
                }
                saveStatLine(charID.toString(), statData).then(arg => {
                    store.dispatch(StatsActions.setStat(arg.stats));
                    store.dispatch(SavesActions.setSaves(arg.saves));
                });
            })
            break;
        default:
            break;
    }

}

