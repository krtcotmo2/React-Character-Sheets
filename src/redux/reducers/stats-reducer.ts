import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { Stat } from "../../interfaces/stat";

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
}
  
export const StatsActions = createActionCreators(StatsReducer);
export const StatsReducerFunctions = createReducerFunction(StatsReducer, initialState);