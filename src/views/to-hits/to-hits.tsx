import { Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { getCharacterToHits } from '../../api/to-hit-api';
import { formatToHits } from './business-logic/to-hit-logic';
import { ToHitGroup } from '../../interfaces/to-hit';
import { ToHitActions } from '../../redux/reducers/to-hit-reducer';

export const ToHitView: React.FC = ():JSX.Element => {
    const levels = useSelector(state => store.getState().levels);
    const stats = useSelector(state => store.getState().stats);
    const toHit = levels.reduce( (orig, lvl) => orig + lvl.toHit, 0);
    const strBonus = Math.floor((stats.str.value - 10) / 2);
    const dexBonus = Math.floor((stats.dex.value - 10) / 2);
    const [curToHits, setCurToHits] = useState<ToHitGroup[]>([])

    useEffect( () => {
        getCharacterToHits(store.getState().character.charID.toString())
           .then( currentHits => {
            const toHitGroups = formatToHits(currentHits);
            setCurToHits(toHitGroups);
            store.dispatch(ToHitActions.setToHitGroups(toHitGroups));
           })
       },[])
       
    return (
        <>
            <Grid container>
                <Grid container item justifyContent='center'>To Hits</Grid>
            </Grid>
            <Grid container direction="column" justifyContent={"center"} gap={2} style={{fontSize:'18px'}}>
                <Grid>Base Melee: {toHit} + {strBonus} = {toHit + strBonus}</Grid>
                <Grid>Base Ranged: {toHit} + {dexBonus} = {toHit + dexBonus}</Grid>
                <Grid>Base CMB: {toHit} + {strBonus} = {toHit + strBonus}</Grid>
                <Grid>Base CMD: 10 + {toHit} + {strBonus} + {dexBonus} = {10 + toHit + strBonus + dexBonus}</Grid>
            </Grid>
            <Divider color='#fff' style={{margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
            <Grid container direction="column" justifyContent={"center"} gap={2} style={{fontSize:'18px'}}>
                {curToHits.map(hit => (
                    <Grid>
                        {hit.hitName}: {toHit}  + {hit.isMelee ? strBonus : dexBonus} + {hit.value}= {toHit + hit.value + (hit.isMelee ? strBonus : dexBonus)}
                    </Grid>
                ))}
            </Grid>
        </>
    )
}