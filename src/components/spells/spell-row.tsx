import React, { useEffect, useState } from 'react';
import { store } from '../../redux/configure-store';
import { Checkbox, Grid, Typography } from '@mui/material';
import { Spell } from '../../interfaces/spell';
import { updateSpell } from '../../api/spells-api';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';

import { useStyles } from '../collapsible-row/collapsible-row-styles';
export interface SpellRowProps {
    spell: Spell,
    isAdding: boolean,
}

export const SpellRow: React.FC<SpellRowProps> = (props: SpellRowProps): JSX.Element => {
    
    const { classes } = useStyles();
    const {id, spellLevel, spellName, isCast} = props.spell;
    const isAdding = props.isAdding;
    const [spellCast, setSpellCast] = useState(isCast);

    const toggleSpell = () => {
        const theSpell: Spell = {
            ...props.spell,
            isCast: !spellCast
        };
        updateSpell(id, theSpell);
        setSpellCast(!spellCast);
    }

    
    return (
        <Grid container item className="spellRow vCen" columnGap={1} justifyContent='space-between'>
            <Checkbox 
                checked={spellCast} 
                onClick={()=>toggleSpell()} 
                style={{color:isAdding ? '#ccc': '#6a6a6a'}}
                checkedIcon={<CheckBoxOutlinedIcon/>}
                disabled={isAdding}
            ></Checkbox>
            <Typography style={{display:'flex', flexGrow:'1'}} onClick={()=>toggleSpell()} >{spellName}</Typography>
            <Grid item >
                <Grid item>
                    <EditIcon className={classes.editIcon}/>
                    <Delete style={{marginLeft:'12px'}}></Delete>
                </Grid>
            </Grid>
        </Grid>
    )
}