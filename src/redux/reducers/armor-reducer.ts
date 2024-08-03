import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { ArmorSet } from "../../interfaces/armor";



declare module '../../interfaces/armor' {
    export const theToHits: ArmorSet[]
}

const initialState: ArmorSet[] = [];

class ArmorGroupReducer extends ImmerReducer<ArmorSet[]> {
    public setArmorGroups(armors: ArmorSet[]){
        this.draftState = armors;
    }
    public clearArmor(){
        this.draftState = initialState;
    }
}

export const ArmorActions = createActionCreators(ArmorGroupReducer);
export const ArmorReducerFunctions = createReducerFunction(ArmorGroupReducer, initialState);