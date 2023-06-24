import React, { useEffect, useState } from 'react';
import { getCharacterSpells } from '../../api/spells-api';
import { Spell, SpellLevelCategory } from '../../interfaces/spell';
import { store } from '../../redux/configure-store';
import { SpellActions } from '../../redux/reducers/spell-reducer';
import { getStaModifier, organizeSpellList } from './business-logic/spells-hepler';
import { Grid } from '@mui/material';
import { Character } from '../../interfaces/character';
import { CharLevel } from '../../interfaces/levels';
import { Stat } from '../../interfaces/stat';

export const Spells: React.FC = (): JSX.Element => {
    const [stats] = useState<Stat | undefined>(store.getState().stats);
    const [lvls] = useState<CharLevel[] | undefined>(store.getState().levels);
    const [char] = useState<Character | undefined>(store.getState().character);
    const [spellGroups, setSpellGroups] = useState<SpellLevelCategory[]>([]);
    useEffect( () => {
        const mod = getStaModifier(lvls || [], stats );
        getCharacterSpells(store.getState().character.charID.toString())
            .then( currentSpells => {
                store.dispatch(SpellActions.setSpells(currentSpells));
                setSpellGroups(organizeSpellList(currentSpells, mod));
            })
    },[])

    return(
        <>
           <Grid container>
                <Grid container item justifyContent='center'>
                    <p>{char?.charName} - Spells</p>
                </Grid>
            </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
                {spellGroups.map(grp => {
                    const spellLst = grp.spells.map(spl => {
                        return (<p>{spl.spellName}</p>)
                    });
                    return (
                        <>
                        <Grid item className="standardRow">
                            <p>Level {grp.spellLevel}: Base \
                            DC - {grp.dcCheck}</p>
                        </Grid>
                        <Grid item className="standardRow">
                            <div className='spellsInLevel'>
                                {spellLst}
                            </div>
                        </Grid>
                        </>
                    )
                    
                })}
            </Grid>
        </>
    )
}