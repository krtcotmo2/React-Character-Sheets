import React, { useEffect, useState } from 'react';
import { getCharacterSpells } from '../../api/spells-api';
import { Spell } from '../../interfaces/spell';
import { store } from '../../redux/configure-store';
import { SpellActions } from '../../redux/reducers/spell-reducer';

export const Spells: React.FC = (): JSX.Element => {
    
    const [spellList, setSpellList] = useState<Spell[]>([]);
    useEffect( () => {
     getCharacterSpells(store.getState().character.charID.toString())
        .then( curentSpells => {
            setSpellList(curentSpells);
            store.dispatch(SpellActions.setSpells(curentSpells));
        })
    },[])

    return(
        <>
        {spellList.map(spell => {
            return (<p>{spell.spellName}</p>)
        })}
        </>
    )
}