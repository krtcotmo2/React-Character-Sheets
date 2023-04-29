import React, { useEffect, useState } from 'react';
import { Character } from '../../interfaces/character';
import { CharLevel } from '../../interfaces/levels';
import { loadCharacters } from './business-logic/characters-select';
import { CharacterRow } from './character-row';

export const CharacterList: React.FC = (): JSX.Element => {
    const [allChars, setAllChars] = useState<Character[]>([]);
    const userId = 1;

    useEffect( () => {
        loadCharacters()
        .then( chars=> {
            setAllChars(chars)
        });
    }, []);

    
    return(
        <div className='charList' >
            <p>Your Characters</p>
            {
                allChars.filter(char => char.userID === userId).map(char => {
                    return (<CharacterRow char={char} key={`char-${char.charID}`}/>);
                })
            }
             <p>Other Characters</p>
            {
                allChars.filter(char => char.userID !== userId).map(char => {
                    return (<CharacterRow char={char} key={`char-${char.charID}`}/>);
                })
            }
        </div>
    )
}