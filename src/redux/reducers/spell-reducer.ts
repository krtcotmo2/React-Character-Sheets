import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { Spell } from "../../interfaces/spell";


declare module '../../interfaces/spell' {
    export const theSpells: Spell[]
}

const initialState: Spell[] = []

class SpellReducer extends ImmerReducer<Spell[]> {
    public setSpells(spells: Spell[]){
        this.draftState = spells;
    }
    public clearSpells(){
        this.draftState = initialState;
    }
}

export const SpellActions = createActionCreators(SpellReducer);
export const SpellReducerFunctions = createReducerFunction(SpellReducer, initialState);