import { Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { getCharacterToHits } from '../../api/to-hit-api';
import { formatToHits } from './business-logic/to-hit-logic';
import { ToHitGroup } from '../../interfaces/to-hit';
import { ToHitActions } from '../../redux/reducers/to-hit-reducer';
import { strictEqual } from 'assert';
import { CollapsibleRow } from '../../components/collapsible-row/collapsible-row';
import { ModifierType } from '../../enum/modifier-type';
import { DamageRow } from '../../components/damage-row/damage-row';

export const ToHitView: React.FC = ():JSX.Element => {
    const levels = useSelector(state => store.getState().levels);
    const stats = useSelector(state => store.getState().stats);
    const char = useSelector(state => store.getState().character);
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
        <Grid container item justifyContent="center">
          <p>{char?.charName} - To Hits</p>
        </Grid>
      </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}}>
                <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px", padding: '0' }} className="standardList">
                    <Grid item className="standardRow">
                        <CollapsibleRow title="Base Melee" value={toHit + strBonus} breakdown={[
                            {
                                id: 0,
                                score: toHit,
                                type: ModifierType.MODIFIER,
                                modDesc: 'Base to Hit'
                            },
                            {
                                id: 0,
                                score: strBonus,
                                type: ModifierType.MODIFIER,
                                modDesc: 'Strength Bonus'
                            },
                            
                        ]}/>
                    </Grid>
                </Grid>
                <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px", padding: '0' }} className="standardList">
                    <Grid item className="standardRow">
                        <CollapsibleRow title="Base Ranged" value={toHit + dexBonus} breakdown={[
                                {
                                    id: 0,
                                    score: toHit,
                                    type: ModifierType.MODIFIER,
                                    modDesc: 'Base to Hit'
                                },
                                {
                                    id: 0,
                                    score: dexBonus,
                                    type: ModifierType.MODIFIER,
                                    modDesc: 'Dexterity Bonus'
                                },
                                
                            ]}/>
                    </Grid>
                </Grid>
                <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px", padding: '0' }} className="standardList">
                    <Grid item className="standardRow">
                        <CollapsibleRow title="Base CMB" value={toHit + strBonus} breakdown={[
                                {
                                    id: 0,
                                    score: toHit,
                                    type: ModifierType.MODIFIER,
                                    modDesc: 'Base to Hit'
                                },
                                {
                                    id: 0,
                                    score: strBonus,
                                    type: ModifierType.MODIFIER,
                                    modDesc: 'Strength Bonus'
                                },
                                
                            ]}/>
                    </Grid>
                </Grid>
                <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px", padding: '0' }} className="standardList">
                    <Grid item className="standardRow">
                        <CollapsibleRow title="Base CMD" value={10 + toHit + dexBonus + strBonus} breakdown={[
                                {
                                    id: 0,
                                    score: 10,
                                    type: ModifierType.MODIFIER,
                                    modDesc: 'Base'
                                }, 
                                {
                                    id: 0,
                                    score: toHit,
                                    type: ModifierType.MODIFIER,
                                    modDesc: 'Base to Hit'
                                },
                                {
                                    id: 0,
                                    score: strBonus,
                                    type: ModifierType.MODIFIER,
                                    modDesc: 'Strength Bonus'
                                },
                                {
                                    id: 0,
                                    score: dexBonus,
                                    type: ModifierType.MODIFIER,
                                    modDesc: 'Dexterity Bonus'
                                },
                                
                            ]}/>
                    </Grid>
                </Grid>
            </Grid>
            <Divider color='#fff' style={{margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
            <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px", padding: '0' }} className="standardList">
                {curToHits.map(hit => (
                    <Grid item className="standardRow" direction='column'>
                        <CollapsibleRow title={hit.hitName} value={toHit + (hit.isMelee ? strBonus : dexBonus) + hit.breakdown.reduce((orig, line) => orig + line.score, 0)} breakdown={[
                            {
                                id: 0,
                                score: toHit,
                                type: ModifierType.MODIFIER,
                                modDesc: 'Base to Hit'
                            },
                            {
                                id: 0,
                                score: hit.isMelee ? strBonus : dexBonus,
                                type: ModifierType.MODIFIER,
                                modDesc: (hit.isMelee ? 'Strength' : 'Dexterity') +  ' Bonus',
                            },
                            ...hit.breakdown,
                        ]}/>
                        <DamageRow 
                            critDamage={hit.critDamage} 
                            critRange={hit.critRange}
                            damage={hit.damage}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}