import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import {ToHit, ToHitGroup} from '../../interfaces/to-hit'

declare module '../../interfaces/to-hit' {
    export const theToHits: ToHitGroup[]
}

const initialState: ToHitGroup[] = [];

class ToHitGroupReducer extends ImmerReducer<ToHitGroup[]> {
    public setToHitGroups(toHits: ToHitGroup[]){
        this.draftState = toHits;
    }
    public clearToHits(){
        this.draftState = initialState;
    }
}


export const ToHitActions = createActionCreators(ToHitGroupReducer);
export const ToHitReducerFunctions = createReducerFunction(ToHitGroupReducer, initialState);