import React from 'react';
import { Modifier } from '../../interfaces/modifier';
import { Grid, } from '@mui/material';
import { useStyles } from './damage-row-styles';
import "../../App.css";
import { ModifierType } from '../../enum/modifier-type';

interface RowProps {
    damage: string;
    critRange: string;
    critDamage: string;
}


export const DamageRow: React.FC<RowProps> = (props: RowProps): JSX.Element => {
    const { classes } = useStyles();
    const {damage, critRange, critDamage} = props;
    return (
        <Grid container className={classes.damageRowContainer} direction={'row'}>
            <Grid container item direction={'row'} flexWrap='nowrap' gap={3}>
                <Grid item  wrap='nowrap' style={{width: 'fit-content', minWidth: 'fit-content'}}>
                    Damage: {damage}
                </Grid>
                <Grid item  style={{maxWidth: 'fit-content'}}>    
                    Crit: {critRange} {critDamage}
                </Grid>
                
            </Grid>
        </Grid>
    )
}

export const calcBonus = (statValue: number | undefined): string => {
    if(!statValue){
        return '';
    }
    const bonus = Math.floor((statValue - 10) / 2);
    return bonus >= 0 ? `+${bonus}`: bonus.toString();
}

export const getDescription = (skill: Modifier, modDescription: string) => {
    if(!skill){
        return modDescription;
    }
    switch(skill.type){
        case ModifierType.BASE: 
        return 'Ranks';
        case ModifierType.CLASSSKILL:
            return 'Class Skill';
        default:
            return modDescription;
    }

}

