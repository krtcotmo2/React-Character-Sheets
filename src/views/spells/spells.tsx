import React, { useEffect, useState } from 'react';
import { getCharacterSpells } from '../../api/spells-api';
import { Spell, SpellLevelCategory } from '../../interfaces/spell';
import { store } from '../../redux/configure-store';
import { SpellActions } from '../../redux/reducers/spell-reducer';
import { getStaModifier, organizeSpellList } from './business-logic/spells-hepler';
import { Button, Divider, Grid } from '@mui/material';
import { Character } from '../../interfaces/character';
import { CharLevel } from '../../interfaces/levels';
import { Stat } from '../../interfaces/stat';
import { Link } from 'react-router-dom';

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
                    <p><Link className='nonDecLink' to={`/character/overview/${char?.charID}`}>{char?.charName}</Link> - Spells</p>
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
                
                <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
                <Button style={{width:'fit-content'}} variant="contained">Add New Spell</Button>
            </Grid>
        </>
    )
}