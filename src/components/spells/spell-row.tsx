import React, { useEffect, useState } from 'react';
import { store } from '../../redux/configure-store';
import { Checkbox, Grid, TextField, Typography } from '@mui/material';
import { Spell } from '../../interfaces/spell';
import { deleteSelectedSpell, getCharacterSpells, updateSpell } from '../../api/spells-api';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useSpellStyles } from "./spell-styles";
import { SpellActions } from '../../redux/reducers/spell-reducer';
export interface SpellRowProps {
    spell: Spell,
    isAdding: boolean,
}

export const SpellRow: React.FC<SpellRowProps> = (props: SpellRowProps): JSX.Element => {
    
    const { classes } = useSpellStyles();
    const {id, spellLevel, spellName, isCast} = props.spell;
    const [isEditing, setIsEditing] = useState(false);
    const isAdding = props.isAdding;
    const [spellCast, setSpellCast] = useState(isCast);
    const charId = store.getState().character.charID;
    const [editSpellName, setEditSpellName] = useState(spellName);

    const toggleSpell = async() => {
        const theSpell: Spell = {
            ...props.spell,
            isCast: !spellCast,
            spellName: editSpellName,
        };
        await updateSpell(id, theSpell);
        setSpellCast(!spellCast);
        const spells = await getCharacterSpells(charId.toString());
        store.dispatch(SpellActions.setSpells(spells));
    }

    useEffect(()=>{
        setEditSpellName(spellName);
    },[spellName]);

    useEffect(()=>{
        setSpellCast(isCast);
    },[isCast]);

    const deleteSpell =  async (spellId: string) => {
        await deleteSelectedSpell(spellId);
        const spells = await getCharacterSpells(charId.toString());
        store.dispatch(SpellActions.setSpells(spells));
    }

    const updateSelectedSpell = () => {
        const theSpell: Spell = {
            ...props.spell,
            spellName: editSpellName,
        };
        updateSpell(id, theSpell);
        setIsEditing(false);
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
            {!isEditing && 
                (<>
                    <Typography style={{display:'flex', flexGrow:'1'}} onClick={()=>toggleSpell()} >{editSpellName}</Typography>
                </>)
            }
            {isEditing && 
                (<>
                    <TextField
                        style={{display:'flex', flexGrow:'1'}} 
                        value={editSpellName}
                        onChange={ (evt)=> setEditSpellName(evt.target.value) }
                        placeholder='Spell Name'
                        className={classes.inputField}
                    />
                </>)
            }
            <Grid item >
                <Grid item>
                    {!isEditing && 
                        (<>
                            <EditIcon className={classes.editIcon} onClick={()=>setIsEditing(true)}/>
                            <Delete style={{marginLeft:'12px'}} onClick={()=>deleteSpell(id)}></Delete>
                        </>)
                    }
                    {isEditing && 
                        (<>
                            <SaveIcon className={classes.editIcon} onClick={()=>updateSelectedSpell()}/>
                            <CloseIcon style={{marginLeft:'12px'}} onClick={()=>setIsEditing(false)}/>
                        </>)
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}