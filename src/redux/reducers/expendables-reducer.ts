import { createActionCreators, createReducerFunction, ImmerReducer} from 'immer-reducer'
import { Expendable } from '../../interfaces/expendable';

declare module '../../interfaces/expendable' {
    export const expendables: Expendable;
}

const initialState: Expendable[] = [];

class ExpendableReducer extends ImmerReducer<Expendable[]>{
    public setExpendable(exp: Expendable[]){
        this.draftState = [...exp];
    }

    public cleartExpendable(){
        this.draftState = initialState;
    }

}

export const ExpendableAction = createActionCreators(ExpendableReducer);
export const ExpendableReducerFunctions = createReducerFunction(ExpendableReducer, initialState);