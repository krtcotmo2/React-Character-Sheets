import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import {User} from '../../interfaces/user'

declare module '../../interfaces/user' {
    export const theUser: User
}

const initialState: User = {
    name: '',
    email: '',
    id: '',
    authenticated: false,
    forcedReset: false,
};

class UserReducer extends ImmerReducer<User> {
    public setUser(user: User){
        this.draftState = user;
    }
    public clearUser(){
        this.draftState = initialState;
    }
}

export const UserActions = createActionCreators(UserReducer);
export const UserReducerFunctions = createReducerFunction(UserReducer, initialState);