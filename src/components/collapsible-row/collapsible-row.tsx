import React, { useState } from 'react';
import { Modifier } from '../../interfaces/modifier';
import { Grid, } from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useStyles } from './collapsible-row-styles';
import "../../App.css";

interface RowProps {
    title: string;
    value: number;
    breakdown: Modifier[];
    includeStatBonus?: boolean;
}

export const CollapsibleRow: React.FC<RowProps> = (props: RowProps): JSX.Element => {
    const [hidden, setHidden] = useState(true);
    const clickIcon = (arg: any) => {
        setHidden(!hidden);
    }
    const { classes } = useStyles();
    const {title, value, breakdown, includeStatBonus} = props;
    return (
        <Grid container>
            <Grid item>
                {title}: {value} {includeStatBonus ? calcBonus(value) : ''}
                <KeyboardArrowDown onClick={clickIcon} className={`${hidden ? '' : 'rotated'} ${classes.iconPadded}`}/>
            </Grid>
            <Grid container direction={'column'} className={`${hidden ? 'hidden' : ''}`} >
                {breakdown.map( mod => (<Grid container item className={`${classes.breakDownSection}`}>{mod.score} - {mod.modDesc}</Grid>))}
            </Grid>
        </Grid>
    )
}

export const calcBonus = (statValue: number): string => {
    const bonus = Math.floor((statValue - 10) / 2);
    return bonus >= 0 ? `+${bonus}`: bonus.toString();
}

