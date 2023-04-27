import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { SavingThrow } from "../../interfaces/saving-throw";

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
}
  
export const SavesActions = createActionCreators(SavesReducer);
export const SavesReducerFunctions = createReducerFunction(SavesReducer, initialState);