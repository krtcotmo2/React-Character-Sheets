import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { Stat } from "../../interfaces/stat";
import { Modifier } from "../../interfaces/modifier";
import { ModifierType } from "../../enum/modifier-type";
import { SavesActions } from "./saves-reducer";
import { store } from "../configure-store";

declare module '../../interfaces/stat' {
    export const theStats: Stat;
}

const initialState: Stat = {
    str: {
        value: 0,
        breakdown:[],
    },
    dex: {
        value: 0,
        breakdown:[],
    },
    con: {
        value: 0,
        breakdown:[],
    },
    int: {
        value: 0,
        breakdown:[],
    },
    wis: {
        value: 0,
        breakdown:[],
    },
    chr: {
        value: 0,
        breakdown:[],
    },
}

class StatsReducer extends ImmerReducer<Stat> {
    public setStat(stats: Stat){
        this.draftState = {...stats};
    }
    public clearStats(){
        this.draftState = initialState
    }

    public addAUpdate(value: number, stat: string, description: string, guid: string){
        const modifier: Modifier = {
            id: 0,
            modDesc: description,
            score: value,
            type: ModifierType.TEMPORARY,
            guid: guid,
         };
         switch(stat){
             case 'str':
                 this.draftState.str.value = this.draftState.str.value + value;
                 this.draftState.str.breakdown.push(modifier);
                 break;
             case 'dex':
                 this.draftState.dex.value = this.draftState.dex.value + value;
                 this.draftState.dex.breakdown.push(modifier);
                 break;
             case 'con':
                 this.draftState.con.value = this.draftState.con.value + value;
                 this.draftState.con.breakdown.push(modifier);
                 break;
            case 'int':
                this.draftState.int.value = this.draftState.int.value + value;
                this.draftState.int.breakdown.push(modifier);
                break;
            case 'wis':
                this.draftState.wis.value = this.draftState.wis.value + value;
                this.draftState.wis.breakdown.push(modifier);
                break;
            case 'chr':
                this.draftState.chr.value = this.draftState.chr.value + value;
                this.draftState.chr.breakdown.push(modifier);
                break; 
            default:
                break;
         }
 
     }

     public removeBonus(guid: string){
        this.draftState.str.breakdown = this.draftState.str.breakdown.filter(
            modifier => modifier.guid !== guid,
        );
        this.draftState.str.value = this.draftState.str.breakdown.reduce((orig, mod) => 
            orig + mod.score, 0
        );
        this.draftState.dex.breakdown = this.draftState.dex.breakdown.filter(
            modifier => modifier.guid !== guid,
        );
        this.draftState.dex.value = this.draftState.dex.breakdown.reduce((orig, mod) => 
            orig + mod.score, 0
        );
        this.draftState.con.breakdown = this.draftState.con.breakdown.filter(
            modifier => modifier.guid !== guid,
        );
        this.draftState.con.value = this.draftState.con.breakdown.reduce((orig, mod) => 
            orig + mod.score, 0
        );
        this.draftState.int.breakdown = this.draftState.int.breakdown.filter(
            modifier => modifier.guid !== guid,
        );
        this.draftState.int.value = this.draftState.int.breakdown.reduce((orig, mod) => 
            orig + mod.score, 0
        );
        this.draftState.wis.breakdown = this.draftState.wis.breakdown.filter(
            modifier => modifier.guid !== guid,
        );
        this.draftState.wis.value = this.draftState.wis.breakdown.reduce((orig, mod) => 
            orig + mod.score, 0
        );
        this.draftState.chr.breakdown = this.draftState.chr.breakdown.filter(
            modifier => modifier.guid !== guid,
        );
        this.draftState.chr.value = this.draftState.chr.breakdown.reduce((orig, mod) => 
            orig + mod.score, 0
        );
    }
}
  
export const StatsActions = createActionCreators(StatsReducer);
export const StatsReducerFunctions = createReducerFunction(StatsReducer, initialState);