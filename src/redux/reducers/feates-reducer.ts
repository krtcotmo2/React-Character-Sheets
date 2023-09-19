import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { Feat } from "../../interfaces/feats";

declare module '../../interfaces/levels' {
    export const thsFeats: Feat[];
}

const initialState: [] = [];

class FeatsReducer  extends ImmerReducer<Feat[]> {
    public setCharFeats(feats: Feat[]){
        this.draftState = feats
    }

    public clearCharFeats(){
        this.draftState = [];
    }
}

export const FeatsActions = createActionCreators(FeatsReducer);
export const FeatsReducerFunctions = createReducerFunction(FeatsReducer, initialState);