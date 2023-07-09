import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { Character } from "../../interfaces/character";

declare module '../../interfaces/character' {
    export const theCharacter: Character;
}

const initialState: Character = {
    alignment: '',
    charHP: 0,
    charID: 0,
    charName: '',
    image: 'default.png',
    init: 0,
    isDead: false,
    race: '',
    userID: 0,
    isCaster: true,
    toHitGroups: []
}

class CharacterReducer extends ImmerReducer<Character> {
    public setCharacter(char: Character){
        this.draftState = {
            alignment: char.alignment,
            charHP: char.charHP,
            charID: char.charID,
            charName: char.charName,
            image: char.image,
            init: char.init,
            isDead: char.isDead,
            race: char.race,
            userID: char.userID,
            isCaster: char.isCaster,
            toHitGroups: char.toHitGroups,
        };
    }
    public clearCharacter(){
        this.draftState = initialState;
    }
}
  
export const CharacterActions = createActionCreators(CharacterReducer);
export const CharacterReducerFunctions = createReducerFunction(CharacterReducer, initialState);