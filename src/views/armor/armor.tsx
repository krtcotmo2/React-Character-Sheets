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
import { Link } from 'react-router-dom';
import { ArmorActions } from '../../redux/reducers/armor-reducer';
import { WHATISMOD } from '../../enum/what-is-mod-type';


export const CharacterArmor:React.FC = (): JSX.Element => {
    
    const [acName, setAcName] = useState('');
    const [acOrder, setAcOrder] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const [armors, setArmors] = useState<ArmorSet[]>([]);
    const char: Character = useSelector(state => store.getState().character);
    const stats: Stat = useSelector(state => store.getState().stats);

    useEffect( () => {
        getCharacterArmor(store.getState().character.charID.toString())
            .then(armors => {
                addStatsToArmor(armors, stats.dex.value);
                setArmors(armors);
                store.dispatch(ArmorActions.setArmorGroups(armors));
            })
    }, []);
    const saveAC = async () => {
        const grouping: ArmorGrouping  = {
            charID: char.charID,
            acDesc: acName,
            sortValue: acOrder
        }
        await createArmorGrouping(char.charID, grouping).then(()=> setIsAdding(false));
    }
    return (   
        <>
            <Grid container>
                <Grid container item justifyContent="center">
                <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Armor</p>
                </Grid>
            </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
                {
                    armors.map(armor => (
                        <Grid item className="standardRow">
                            <CollapsibleRow 
                                title={armor.name} 
                                breakdown={armor.values} 
                                value={armor.score}
                                characteristic={WHATISMOD.ARMOR}
                                acID={armor.acID}
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
                                placeholder='Order'
                                required    
                                type="number"
                                value={acOrder}
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