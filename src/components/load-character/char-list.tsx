import React, { useEffect, useState } from 'react';
import { Character } from '../../interfaces/character';
import { loadCharacters } from './business-logic/characters-select';
import { CharacterRow } from './character-row';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';

export const CharacterList: React.FC = (): JSX.Element => {
    const [allChars, setAllChars] = useState<Character[]>([]);
    const userId = useSelector( state => store.getState().user.id);

    useEffect( () => {
        loadCharacters()
        .then( chars=> {
            setAllChars(chars)
        });
    }, []);

    
    return(
        <div className='charList standardList' >
            {allChars.filter(char => char.userID.toString() === userId).length > 0 && (<p>Your Characters</p>)}
            {
                allChars.filter(char => char.userID.toString() === userId).map(char => {
                    return (<CharacterRow char={char} key={`char-${char.charID}`}/>);
                })
            }
             <p>Other Player Characters</p>
            {
                allChars.filter(char => char.userID.toString() !== userId).map(char => {
                    return (<CharacterRow char={char} key={`char-${char.charID}`}/>);
                })
            }
        </div>
    )
}