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
import { SpellActions } from '../../redux/reducers/spell-reducer';
import { Equipment } from '../../interfaces/equipment';
import { useSpellStyles } from '../spells/spell-styles';
import { deleteCharacterEquipment, getCharacterEquipment, updateCharacterEquipment } from '../../api/equipment-api';
import { EquipmentActions } from '../../redux/reducers/equipment-reducer';
export interface EquipmentRowProps {
    equipItem: Equipment,
    isAdding: boolean,
}

export const EquipmentRow: React.FC<EquipmentRowProps> = (props: EquipmentRowProps): JSX.Element => {
    
    const { classes } = useSpellStyles();
    const {id, equip, weight, location, partOfOverallWeight, equipOrder} = props.equipItem;
    const [isEditing, setIsEditing] = useState(false);
    const isAdding = props.isAdding;
    const [isPartOfWt, setIsPartOfWt] = useState(partOfOverallWeight);
    const charId = store.getState().character.charID;
    const [itemName, setItemName] = useState(equip);
    const [itemWeight, setItemWeight] = useState(weight);
    const [includeWt, setIncludeWt] = useState(partOfOverallWeight);

    const toggleSpell = async() => {
        setIncludeWt(!includeWt);
        // const theSpell: Spell = {
        //     ...props.equipItem,
        //     isCast: !spellCast,
        //     spellName: editSpellName,
        // };
        // await updateSpell(id, theSpell);
        // setSpellCast(!spellCast);
        // const spells = await getCharacterSpells(charId.toString());
        // store.dispatch(SpellActions.setSpells(spells));
    }

    // useEffect(()=>{
    //     setEditSpellName(spellName);
    // },[spellName]);

    // useEffect(()=>{
    //     setSpellCast(isCast);
    // },[isCast]);

    const deleteItem =  async (spellId: string) => {
        await deleteCharacterEquipment(spellId, charId.toString());
        const equip = await getCharacterEquipment(charId.toString());
        store.dispatch(EquipmentActions.setCharEquipment(equip));

    }

    const updateSelectedItem = async () => {
        const item: Equipment = {
            id,
            charID: charId,
            equip: itemName,
            weight: itemWeight,
            partOfOverallWeight: includeWt,
            equipOrder: props.equipItem.equipOrder,
            location: props.equipItem.location,
        }
       await updateCharacterEquipment(charId.toString(), item)
        .then(arg => {
            store.dispatch(EquipmentActions.setCharEquipment(arg));
        });
       setIsEditing(false);
    }
    
    return (
        <Grid container item className="equipRow vCen" columnGap={1} justifyContent='space-between'>
            {!isEditing && 
                (<>
                    <Typography style={{display:'flex', flexGrow:'1'}} >{itemName}</Typography>
                    <Typography style={{display:'flex', paddingRight:'24px'}}>{itemWeight} lbs{includeWt?'':'*'}</Typography>
                </>)
            }
            {isEditing && 
                (<>
                    <TextField
                        style={{display:'flex', flexGrow:'1'}} 
                        value={itemName}
                        onChange={ (evt)=> setItemName(evt.target.value) }
                        placeholder='Name'
                        className={classes.inputField}
                    />
                    <TextField
                        style={{display:'flex', flexGrow:'1'}} 
                        value={itemWeight}
                        onChange={ (evt)=> setItemWeight(+evt.target.value) }
                        placeholder='Weight'
                        type='number'
                        className={classes.inputField}
                    />
                    <Checkbox 
                        checked={includeWt} 
                        onClick={()=>setIncludeWt(!includeWt)} 
                        style={{color:isAdding ? '#ccc': '#6a6a6a'}}
                        checkedIcon={<CheckBoxOutlinedIcon/>}
                        disabled={isAdding}
                    ></Checkbox>
                </>)
            }
            <Grid item >
                <Grid item>
                    {!isEditing && 
                        (<>
                            <EditIcon className={classes.editIcon} onClick={()=>setIsEditing(true)}/>
                            <Delete style={{marginLeft:'12px'}} onClick={()=>deleteItem(id.toString())}></Delete>
                        </>)
                    }
                    {isEditing && 
                        (<>
                            <SaveIcon className={classes.editIcon} onClick={()=>updateSelectedItem()}/>
                            <CloseIcon style={{marginLeft:'12px'}} onClick={()=>setIsEditing(false)}/>
                        </>)
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}