import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { CollapsibleRow } from '../../components/collapsible-row/collapsible-row';
import { Character } from '../../interfaces/character';
import { Button, Divider, Grid, TextField } from '@mui/material';
import { Armor, ArmorGrouping, ArmorSet } from '../../interfaces/armor';
import { createArmorGrouping, getCharacterArmor } from '../../api/armor-api';
import { Stat } from '../../interfaces/stat';
import { addStatsToArmor } from './business-logic/armor-helper';
import { Link, useNavigate } from 'react-router-dom';
import { ArmorActions } from '../../redux/reducers/armor-reducer';
import { WHATISMOD } from '../../enum/what-is-mod-type';
import useCookie, {setCookie} from 'react-use-cookie';
import { CharacterActions } from '../../redux/reducers/character-reducer';
import { SavesActions } from '../../redux/reducers/saves-reducer';
import { SkillActions } from '../../redux/reducers/skills.reducer';
import { StatsActions } from '../../redux/reducers/stats-reducer';
import { ToHitActions } from '../../redux/reducers/to-hit-reducer';
import { UserActions } from '../../redux/reducers/user-reducer';

export const CharacterArmor:React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const [acName, setAcName] = useState('');
    const [acOrder, setAcOrder] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const [armors, setArmors] = useState<ArmorSet[]>([]);
    const [userToken, setUserToken] = useCookie('token', '0');
    const char: Character = useSelector(state => store.getState().character);
    const stats: Stat = useSelector(state => store.getState().stats);

    useEffect( () => {
        getCharacterArmor(store.getState().character.charID.toString())
            .then(armors => {
                addStatsToArmor(armors, stats.dex.value);
                setArmors(armors);
                store.dispatch(ArmorActions.setArmorGroups(armors));
            }).catch(err=>{
                setUserToken('');
                setCookie('token', '',{days:-1});
                store.dispatch(StatsActions.clearStats());
                store.dispatch(SavesActions.clearSaves());
                store.dispatch(SkillActions.clearSkills());
                store.dispatch(CharacterActions.clearCharacter());
                store.dispatch(ArmorActions.clearArmor());
                store.dispatch(ToHitActions.clearToHits());
                store.dispatch(UserActions.clearUser());
                navigate('/');
                
            })
    }, []);
    const saveAC = async () => {
        const grouping: ArmorGrouping  = {
            charID: char.charID,
            acDesc: acName,
            sortValue: acOrder,
            pinned: false,
        }
        await createArmorGrouping(char.charID, grouping).then((armors)=> {
            setIsAdding(false);
            setAcName('');
            setAcOrder(0);
            addStatsToArmor(armors, stats.dex.value);
            setArmors(armors);
            store.dispatch(ArmorActions.setArmorGroups(armors));
        });
    }
    return (   
        <>
            <Grid container>
                <Grid container item justifyContent="center" direction='column'>
                    <p style={{marginBottom: '0'}}>
                        <Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Armor
                        <Link className='topLink' to={`/character/spells/${char.charID}`} title="Spells"><img className='topLineIcons' src='/images/clean.svg'/></Link>
                        <Link className='topLink' to={`/character/expendables/${char.charID}`} title="Expendables"><img className='topLineIcons' src='/images/testing-tube.svg'/></Link>
                        <Link className='topLink' to={`/character/notes/${char.charID}`} title="Notes"><img className='topLineIcons' src='/images/ancient-scroll.svg'/></Link> 
                    </p>
                    <p style={{marginTop: '0', fontSize: '14px', color:'rgb(159, 6, 6)'}}>Full AC / Touch AC / Flatfooted AC</p>
                </Grid>
            </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
                {
                    armors.map(armor => (
                        <Grid key={armor.acID} item className="standardRow">
                            <CollapsibleRow 
                                title={armor.name} 
                                breakdown={armor.values} 
                                value={armor.score}
                                characteristic={WHATISMOD.ARMOR}
                                acID={armor.acID}
                                armorData={armor}
                            />
                        </Grid>
                    ))
                }
                <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
                {!isAdding && 
                    (<Button style={{width:'fit-content'}} variant="contained" onClick={() => setIsAdding(true) }>Add New Defined AC</Button>)
                }
                {isAdding && 
                    <Grid container direction='column' justifyContent={"center"} rowGap={3}>
                        <Grid container item direction='row' justifyContent={"center"} columnGap={3}>
                            <TextField
                                placeholder='Name'
                                required    
                                type="text"
                                value={acName}
                                onChange={(event) => setAcName(event.target.value)}
                            />
                            <TextField
                                placeholder='Sort Order'
                                required    
                                type="number"
                                value={acOrder}
                                helperText="Sorting Order"
                                onChange={(event) => setAcOrder(+event.target.value)}
                            />
                       
                        </Grid>
                        <Grid container item direction='row' justifyContent={"center"} columnGap={3}>
                            <Button style={{width:'fit-content'}} variant="contained" onClick={() => setIsAdding(false)} >Cancel</Button>
                            <Button style={{width:'fit-content'}} variant="contained" onClick={saveAC} >Save</Button>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </>     
    )
}