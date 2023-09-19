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

    public updateSingleExpendable(newExp: Expendable){
        let arr = [
            ...this.draftState.filter(exp => exp.id !== newExp.id),
            newExp
        ];
        arr = arr.sort( (a, b) => {
            if(a.expType && b.expType){
                if(a.expType < b.expType || ''){
                    return -1;
                }else if(a.expType > b.expType || ''){
                    return 1;
                }else if(a.description < b.description){
                    return -1
                }else{
                    return 1
                }
            }
            return 0;
        })
        this.draftState = arr
    }

    public cleartExpendable(){
        this.draftState = initialState;
    }

}

export const ExpendableAction = createActionCreators(ExpendableReducer);
export const ExpendableReducerFunctions = createReducerFunction(ExpendableReducer, initialState);