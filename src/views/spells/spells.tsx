import React, { useEffect, useState } from 'react';
import { createNewSpell, getCharacterSpells } from '../../api/spells-api';
import { Spell, SpellLevelCategory } from '../../interfaces/spell';
import { store } from '../../redux/configure-store';
import { SpellActions } from '../../redux/reducers/spell-reducer';
import { getStaModifier, organizeSpellList } from './business-logic/spells-hepler';
import { Button, Divider, Grid, TextField } from '@mui/material';
import { Character } from '../../interfaces/character';
import { CharLevel } from '../../interfaces/levels';
import { Stat } from '../../interfaces/stat';
import { Link } from 'react-router-dom';
import { SpellLevelBar } from '../../components/spells/spell-level-bar';
import { SpellRow } from '../../components/spells/spell-row';
import { useSelector } from 'react-redux';

export const Spells: React.FC = (): JSX.Element => {
    const [isAdding, setIsAdding] = useState(false);
    const [spellLvl, setSpellLvl] = useState('');
    const [spellName, setSpellName] = useState('');
    const [stats] = useState<Stat | undefined>(store.getState().stats);
    const [lvls] = useState<CharLevel[] | undefined>(store.getState().levels);
    const [char] = useState<Character | undefined>(store.getState().character);
    const memorizedSpells = useSelector<Spell[]>( state => store.getState().spells);
    const [spellGroups, setSpellGroups] = useState<SpellLevelCategory[]>([]);
    useEffect( () => {
        const mod = getStaModifier(lvls || [], stats );
        getCharacterSpells(store.getState().character.charID.toString())
            .then( currentSpells => {
                store.dispatch(SpellActions.setSpells(currentSpells));
                setSpellGroups(organizeSpellList(memorizedSpells as Spell[], mod));
            })
    },[])
    useEffect( () => {
        setSpellGroups([]);
        const mod = getStaModifier(lvls || [], stats );
        setSpellGroups(organizeSpellList(memorizedSpells as Spell[], mod));
    }, [memorizedSpells])

    const addNewSpell = () => {
        setIsAdding(true);
    }
    const saveNewSpell = () => {
        const newSpell: Spell = {
            id: '0',
            charID: char?.charID.toString() || '',
            spellLevel: +spellLvl,
            spellName: spellName,
            spellID: undefined,
            isCast: false,
        }
        createNewSpell(newSpell.charID, newSpell).then( async () => {
            setSpellLvl('');
            setSpellName('');
            setIsAdding(false);
            return getCharacterSpells(newSpell.charID);
        })
        .then(spells =>{
            const mod = getStaModifier(lvls || [], stats );
            store.dispatch(SpellActions.setSpells(spells));
            setSpellGroups(organizeSpellList(spells, mod));
        });
    }
    return(
        <>
           <Grid container>
                <Grid container item justifyContent='center'>
                    <p><Link className='nonDecLink' to={`/character/overview/${char?.charID}`}>{char?.charName}</Link> - Spells</p>
                </Grid>
            </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
                {spellGroups.map(grp => {
                    return (<>
                        <SpellLevelBar spellGrp={grp}/>
                        <div className='spellGrp'>
                            {
                                grp.spells.map(sp => {
                                    return (<SpellRow spell={sp} isAdding={isAdding}/>)
                                } )
                            }
                        </div>
                    </>)
                })}
            </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList"> 
                <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
                { !isAdding &&
                    <Button style={{width:'fit-content'}} variant="contained" onClick={() => addNewSpell()}>Add New Spell</Button>
                }
                { isAdding &&
                    <>
                        <Grid container direction="row" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList" columnGap={3}>
                            <TextField
                                required
                                type="text"
                                placeholder='Spell'
                                value={spellName}
                                onChange={(event)=>setSpellName(event.target.value)}
                            />
                            <TextField
                                required
                                type="number"
                                placeholder='Level'
                                value={spellLvl}
                                onChange={(event)=>setSpellLvl(event.target.value)}
                                InputProps={{ inputProps: { min: "0", step: "1" } }}
                            />
                        </Grid>
                        <Grid container direction="row" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList" columnGap={3}>
                            <Button style={{width:'fit-content'}} variant="contained" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button style={{width:'fit-content'}} variant="contained" onClick={saveNewSpell}>Save</Button>
                        </Grid>
                    </>
                }
            </Grid>
        </>
    )
}