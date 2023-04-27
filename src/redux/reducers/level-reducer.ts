import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { CharLevel } from "../../interfaces/levels";

declare module '../../interfaces/levels' {
    export const theLevels: CharLevel[];
}

const initialState: CharLevel[] = [];

class CharLevelReducer  extends ImmerReducer<CharLevel[]> {
    public setCharLevels(levels: CharLevel[]){
        this.draftState = levels
    }

    public clearCharLevels(){
        this.draftState = [];
    }
}

export const CharLevelActions = createActionCreators(CharLevelReducer);
export const CharLevelReducerFunctions = createReducerFunction(CharLevelReducer, initialState);