import React, { useState } from 'react';
import { Modifier } from '../../interfaces/modifier';
import { Grid, } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import { useStyles } from '../collapsible-row/collapsible-row-styles';
import "../../App.css";
import { removeTempBonus } from './business-logic/temp-bonus-helper';


interface RowProps {
    title: string;
    value?: number;
    guid?: string;
    reducer?: string;
    stat?: string
}

export const TempBonus: React.FC<RowProps> = (props: RowProps): JSX.Element => {
    const [hidden, setHidden] = useState(true);
    
    const { classes } = useStyles();
    const {title, value, guid, reducer, stat} = props;
    return (
        <Grid container className={classes.collapsibleRowContainer} direction={'column'}>
            <Grid container item direction={'row'} flexWrap='nowrap'>
                <Grid item container direction='row' wrap='nowrap' flexGrow={1} style={{width: 'fit-content', minWidth: 'fit-content'}} gap={2}>
                    <span>{title}: </span><span style={{color: 'rgba(159,6,6,1)', fontWeight: '700'}}>{value} {stat}</span>
                </Grid>
                <Grid item container  flexShrink={1} style={{maxWidth: 'fit-content'}}>    
                    <Delete className={`${classes.iconPadded}`} onClick={() => {
                        removeTempBonus(guid || '', reducer);
                    }}/>
                </Grid> 
            </Grid>
        </Grid>
    )
}