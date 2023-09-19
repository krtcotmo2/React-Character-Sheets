import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { SavingThrow } from "../../interfaces/saving-throw";
import { ModifierType } from "../../enum/modifier-type";
import { Modifier } from "../../interfaces/modifier";
import { store } from "../configure-store";
import { Stat } from "../../interfaces/stat";
import { stat } from "fs";

declare module '../../interfaces/stat' {
    export const theSaves: SavingThrow;
}

const initialState: SavingThrow = {
    fortitude: {
        value: 0,
        breakdown:[],
    },
    reflex: {
        value: 0,
        breakdown:[],
    },
    will: {
        value: 0,
        breakdown:[],
    },
}

class SavesReducer extends ImmerReducer<SavingThrow> {
    public setSaves(stats: SavingThrow){
        this.draftState = {...stats};
    }
    public clearSaves(){
        this.draftState = initialState
    }
    public addAUpdate(value: number, save: string, description: string, guid: string){
       const modifier: Modifier = {
            id: 0,
            modDesc: description,
            score: value,
            type: ModifierType.TEMPORARY,
            guid: guid,
        };
        switch(save){
            case 'fortitude':
                this.draftState.fortitude.value = this.draftState.fortitude.value + value;
                this.draftState.fortitude.breakdown.push(modifier);
                break;
            case 'reflex':
                this.draftState.reflex.value = this.draftState.reflex.value + value;
                this.draftState.reflex.breakdown.push(modifier);
                break;
            case 'will':
                this.draftState.will.value = this.draftState.will.value + value;
                this.draftState.will.breakdown.push(modifier);
                break;
            default:
                break;
        }

    }
    public updateDueToStatChange(value: number, stat: string){
        switch(stat){
            case 'con':
                const conBonus = this.draftState.fortitude.breakdown.find(modifier => 
                    modifier.modDesc === 'Con Bonus'
                );
                if(conBonus){
                    conBonus.score = value;
                }
                this.draftState.fortitude.value = this.draftState.fortitude.breakdown.reduce(
                    (orig, sc) => orig + sc.score, 0
                );
                break;
            case 'dex':
                const dexBonus = this.draftState.reflex.breakdown.find(modifier => 
                    modifier.modDesc === 'Dex Bonus'
                );
                if(dexBonus){
                    dexBonus.score = value;
                }
                this.draftState.reflex.value = this.draftState.reflex.breakdown.reduce(
                    (orig, sc) => orig + sc.score, 0
                );
                break;
            case 'wis':
                const wisBonus = this.draftState.will.breakdown.find(modifier => 
                    modifier.modDesc === 'Wis Bonus'
                );
                if(wisBonus){
                    wisBonus.score = value;
                }
                this.draftState.will.value = this.draftState.will.breakdown.reduce(
                    (orig, sc) => orig + sc.score, 0
                );
                break;
            default:
                break;
        }
    }

    public removeBonus(guid: string){
        this.draftState.fortitude.breakdown = this.draftState.fortitude.breakdown.filter(
            modifier => modifier.guid !== guid,
        );
        this.draftState.fortitude.value = this.draftState.fortitude.breakdown.reduce((orig, mod) => 
            orig + mod.score, 0
        );
        this.draftState.reflex.breakdown = this.draftState.reflex.breakdown.filter(
            modifier => modifier.guid !== guid,
        );
        this.draftState.reflex.value = this.draftState.reflex.breakdown.reduce((orig, mod) => 
            orig + mod.score, 0
        );
        this.draftState.will.breakdown = this.draftState.will.breakdown.filter(
            modifier => modifier.guid !== guid,
        );
        this.draftState.will.value = this.draftState.will.breakdown.reduce((orig, mod) => 
            orig + mod.score, 0
        );
    }

    public resetSaves(stats: Stat){
        const conBonus = this.draftState.fortitude.breakdown.find(modifier => 
            modifier.modDesc === 'Con Bonus'
        );
        if(conBonus){
            conBonus.score = Math.floor((stats.con.value - 10) / 2);
        }
        this.draftState.fortitude.value = this.draftState.fortitude.breakdown.reduce(
            (orig, mod) => orig + mod.score, 0
        );
        const dexBonus = this.draftState.reflex.breakdown.find(modifier => 
            modifier.modDesc === 'Dex Bonus'
        );
        if(dexBonus){
            dexBonus.score = Math.floor((stats.dex.value - 10) / 2);
        }
        this.draftState.reflex.value = this.draftState.reflex.breakdown.reduce(
            (orig, mod) => orig + mod.score, 0
        );
        const wisBonus = this.draftState.will.breakdown.find(modifier => 
            modifier.modDesc === 'Wis Bonus'
        );
        if(wisBonus){
            wisBonus.score = Math.floor((stats.wis.value - 10) / 2);
        }
        this.draftState.will.value = this.draftState.will.breakdown.reduce(
            (orig, mod) => orig + mod.score, 0
        );
                
    }
}

  
export const SavesActions = createActionCreators(SavesReducer);
export const SavesReducerFunctions = createReducerFunction(SavesReducer, initialState);