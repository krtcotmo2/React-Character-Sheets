import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { Skill } from "../../interfaces/skills";
import { RawSkill } from "../../interfaces/raw-skill";

declare module '../../interfaces/skills' {
    export const theSkills: RawSkill[]
}

const initialState: RawSkill[] = []

class SkillReducer extends ImmerReducer<RawSkill[]> {
    public setSkills(skills: RawSkill[]){
        this.draftState = skills;
    }
    public clearSkills(){
        this.draftState = initialState;
    }
}

export const SkillActions = createActionCreators(SkillReducer);
export const SkillReducerFunctions = createReducerFunction(SkillReducer, initialState);