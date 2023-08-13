import React, { useEffect, useState } from 'react';
import { store } from '../../redux/configure-store';
import { Grid } from '@mui/material';
import { SpellLevelCategory } from '../../interfaces/spell';


export interface SpellLevelProps {
    spellGrp: SpellLevelCategory,
    onClick: () => void;
}
export const SpellLevelBar: React.FC<SpellLevelProps> = (props: SpellLevelProps): JSX.Element => {
    const {spellLevel, dcCheck, spells} = props.spellGrp
    return (
        <Grid container item className="standardRow spellTitleBar padding12 vCen" style={{marginBottom:0}} justifyContent='space-between' onClick={props.onClick}>
            <Grid item  columnGap={1}>
                <strong>Level {spellLevel}: </strong>
                <span style={{fontSize: "0.8rem"}}>Base DC - {dcCheck}</span> 
            </Grid>
            <Grid item>
                <span style={{fontSize: "0.8rem"}}>Remaining {spells.filter(spell => !spell.isCast ).length} of {spells.length}</span>
            </Grid>
        </Grid>
    )
}