import React, { useEffect, useState } from 'react';
import { Character } from '../../interfaces/character';
import { loadCharacters } from './business-logic/characters-select';
import { CharacterRow } from './character-row';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { getCookie } from 'react-use-cookie';
import { checkStatus } from '../../api/user-api';
import { User } from '../../interfaces/user';
import { UserActions } from '../../redux/reducers/user-reducer';

export const CharacterList: React.FC = (): JSX.Element => {
    const [allChars, setAllChars] = useState<Character[]>([]);
    const userId = useSelector( state => store.getState().user.id);

    useEffect( () => {
        const token = getCookie('token');
        if(userId ==='' && token !== '' && token !== undefined){
            checkStatus().then(arg=>{
                const mappedUser: User = {
                    name: arg.userName,
                    email: arg.userEmail,
                    id: arg.userID.toString(),
                    authenticated: true,
                    forcedReset: arg.forcedReset
                }
                store.dispatch(UserActions.setUser(mappedUser));
                loadCharacters()
                .then( chars=> {
                    setAllChars(chars)
                });
            }).catch(()=>{});
        }else{
            loadCharacters()
            .then( chars=> {
                setAllChars(chars)
            });
        }
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