import React, { useEffect, useState } from 'react';
import { getCharacterSpells } from '../../api/spells-api';
import { Spell, SpellLevelCategory } from '../../interfaces/spell';
import { store } from '../../redux/configure-store';
import { SpellActions } from '../../redux/reducers/spell-reducer';
import { organizeSpellList } from './business-logic/spells-hepler';
import { Grid } from '@mui/material';
import { Character } from '../../interfaces/character';

export const Spells: React.FC = (): JSX.Element => {
    const [char] = useState<Character | undefined>(store.getState().character);
    const [spellGroups, setSpellGroups] = useState<SpellLevelCategory[]>([]);
    useEffect( () => {
     getCharacterSpells(store.getState().character.charID.toString())
        .then( currentSpells => {
            store.dispatch(SpellActions.setSpells(currentSpells));
            setSpellGroups(organizeSpellList(currentSpells));
        })
    },[])

    return(
        <>
           <Grid container>
                <Grid container item justifyContent='center'>
                    <p>{char?.charName} - Spells</p>
                </Grid>
            </Grid>
            {spellGroups.map(grp => {
                const spellLst = grp.spells.map(spl => {
                    return (<p>{spl.spellName}</p>)
                });
                return (
                    <>
                        <p>{grp.spellLevel}</p>
                        {spellLst}
                    </>
                )
                
            })}
        </>
    )
}