import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { Skill } from "../../interfaces/skills";

declare module '../../interfaces/skills' {
    export const theSkills: Skill[]
}

const initialState: Skill[] = []

class SkillReducer extends ImmerReducer<Skill[]> {
    public setSkills(skills: Skill[]){
        this.draftState = skills;
    }
    public clearSkills(){
        this.draftState = initialState;
    }
}

export const SkillActions = createActionCreators(SkillReducer);
export const SkillReducerFunctions = createReducerFunction(SkillReducer, initialState);