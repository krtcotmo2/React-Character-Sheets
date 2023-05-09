import React, { useState } from 'react';
import { Modifier } from '../../interfaces/modifier';
import { Grid, } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useStyles } from './collapsible-row-styles';
import "../../App.css";
import { Skill } from '../../interfaces/skills';
import { ModifierType } from '../../enum/modifier-type';

interface RowProps {
    title: string;
    value?: number;
    breakdown: Modifier[];
    includeStatBonus?: boolean;
    skillData?: Skill;
    altText?: string;
}


export const CollapsibleRow: React.FC<RowProps> = (props: RowProps): JSX.Element => {
    const [hidden, setHidden] = useState(true);
    const clickIcon = (arg: any) => {
        setHidden(!hidden);
    }
    const { classes } = useStyles();
    const {title, value, breakdown, includeStatBonus, altText} = props;
    return (
        <Grid container className={classes.collapsibleRowContainer} direction={'column'}>
            <Grid container item direction={'row'} flexWrap='nowrap'>
                <Grid item container direction='row' wrap='nowrap' flexGrow={1} style={{width: 'fit-content', minWidth: 'fit-content'}}>
                    {title}: {value}
                </Grid>
                <Grid item container  flexShrink={1} style={{maxWidth: 'fit-content'}}>    
                    <InfoIcon onClick={clickIcon} className={`${classes.iconPadded}`}/>
                </Grid>
                <Grid item container flexShrink={1} style={{textAlign: 'left', paddingLeft: '18px'}}> 
                    {includeStatBonus ? calcBonus(value) : ''} {altText}
                </Grid>
                <Grid item container  flexShrink={1} style={{maxWidth: 'fit-content'}}>    
                    <PushPinIcon onClick={clickIcon} className={`${props.skillData?.pinned ? '' : 'hidden'} ${classes.iconPadded}`}/>
                </Grid>
            </Grid>
            <Grid container direction={'column'} className={`${hidden ? 'hidden' : ''}`} >
                {breakdown.map( mod => (<Grid container item className={`${classes.breakDownSection}`}>{mod.score} - {getDescription(mod, mod.modDesc)}</Grid>))}
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

