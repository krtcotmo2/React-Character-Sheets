import { Button, Checkbox, FormControl, FormControlLabel, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilterBar } from '../../components/filter-bar/filter-bar';
import { store } from '../../redux/configure-store';
import { Character } from '../../interfaces/character';
import { useSelector } from 'react-redux';
import { createCharacterEquipment, deleteCharacterEquipment, getCharacterEquipment } from '../../api/equipment-api';
import { EquipmentActions } from '../../redux/reducers/equipment-reducer';
import { Equipment, EquipmentData } from '../../interfaces/equipment';
import { carryCap } from '../../enum/carry-capacity';
import { Stat } from '../../interfaces/stat';
import { EquipmentRow } from '../../components/equipment/equipment-row';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { equal } from 'assert';

export const EquipmentView: React.FC = (): JSX.Element => {
    const char: Character = useSelector((state) => store.getState().character);
    const stats: Stat = useSelector((state) => store.getState().stats);
    const equipData: EquipmentData = useSelector((state) => store.getState().equipment);
    const [listFilter, setListFilter] = useState('');
    const [itemName, setIemName] = useState('');
    const [itemWeight, setItemWeight] = useState('');
    const [partOfEnc, setPartOfEnc] = useState(true);
    const [addingNew, setAddingNew] = useState(false);
    const [fullList, setFullList] = useState<Equipment[]>([]);
    const [encumbrance, setEncumberance] = useState('');
    const [theStuff, setTheStuff] = useState<Equipment[]>([]);
    const [theWeight, setTheWeight] = useState(0.0);

    useEffect( () => {
        getCharacterEquipment(store.getState().character.charID.toString())
           .then( curEquipment => {
                setFullList(curEquipment.items);
                setTheStuff(curEquipment.items);
                setTheWeight(curEquipment.weight);
                const enc = carryCap.find(row => row.str === stats.str.value ?? 1);
                if( (enc?.heavy ?? 0) <= curEquipment.weight){
                    setEncumberance('Heavy Encumbrance');
                }else if((enc?.light ?? 0) >= curEquipment.weight){
                    setEncumberance('Light Encumbrance');
                
                } else {
                    setEncumberance('Medium Encumbrance');
                }
                store.dispatch(EquipmentActions.setCharEquipment(curEquipment));
           })
    },[]);

    useEffect( () => {
        setTheStuff([]);
        const a = fullList.filter(item => item.equip.toLowerCase().includes(listFilter.toLowerCase()));
        setTimeout(()=>setTheStuff(a), 5);
    }, [listFilter]);

    useEffect( () => {
        setFullList(equipData.items);
        setTheStuff(equipData.items);
        setTheWeight(equipData.weight);
        const enc = carryCap.find(row => row.str === stats.str.value ?? 1);
        if( (enc?.heavy ?? 0) <= equipData.weight){
            setEncumberance('Heavy Encumbrance');
        }else if((enc?.light ?? 0) >= equipData.weight){
            setEncumberance('Light Encumbrance');
        
        } else {
            setEncumberance('Medium Encumbrance');
        }
    }, [equipData]);

    const closeAdding = () => {
        setAddingNew(false);
        setPartOfEnc(true);
        setIemName('');
        setItemWeight('');
    }

    const saveItem = async () =>{
        const newItem: Equipment = {
            id: 0,
            charID: char.charID,
            equip: itemName,
            weight: +itemWeight,
            equipOrder: fullList.length+1,
            location: '',
            partOfOverallWeight: partOfEnc
        }
        await createCharacterEquipment(char.charID.toString(), newItem)
        .then(arg => {
            setFullList(arg.items);
            setTheStuff(arg.items);
            setTheWeight(arg.weight);
            store.dispatch(EquipmentActions.setCharEquipment(arg));
        });
        closeAdding();
    }

    return(<>
        <Grid container>
            <Grid container item justifyContent="center">
            <p>
                <Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Equipment
                <Link className='topLink' to={`/character/spells/${char.charID}`} title="Spells"><img className='topLineIcons' src='/images/clean.svg'/></Link>
                <Link className='topLink' to={`/character/expendables/${char.charID}`} title="Expendables"><img className='topLineIcons' src='/images/testing-tube.svg'/></Link>
                <Link className='topLink' to={`/character/notes/${char.charID}`} title="Notes"><img className='topLineIcons' src='/images/ancient-scroll.svg'/></Link> 
            </p>
            </Grid>
        </Grid>
        <FilterBar value={listFilter} setValue={setListFilter}/>
        <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
            {encumbrance} ({theWeight?.toFixed(2)} lbs)
        </Grid>
        <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
            {
                theStuff.map(item => { 
                    return (<EquipmentRow equipItem={item} isAdding={addingNew}/>)
                }
            )}
            {theStuff.some(item => !item.partOfOverallWeight)? <>* not considered part of overall weight</> : <></>}
        </Grid>
        
        { !addingNew &&
            <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px', paddingBottom:'12px'}} className="standardList">
                <Button style={{width:'fit-content'}} variant="contained" onClick={()=>setAddingNew(true)}>Add New Item</Button>
            </Grid>
        }
        { addingNew &&
            <>
                <Grid container item justifyContent="center" columnGap={3} style={{marginBottom:'12px'}} alignItems='center'>
                    <TextField
                        required
                        type="text"
                        placeholder='Item'
                        value={itemName}
                        onChange={(event)=>setIemName(event.target.value)}
                    />
                    <TextField
                        required
                        type="number"
                        placeholder='Weight'
                        value={itemWeight}
                        onChange={(event)=>setItemWeight(event.target.value)}
                        InputProps={{ inputProps: { min: "0", step: "1" } }}
                    />
                    <FormControl component="fieldset">
                        <FormControlLabel 
                            labelPlacement='bottom'
                            value="placement"
                            label='Part of encumbrance'
                            control={
                                <Checkbox 
                                    checked={partOfEnc}
                                    style={{color:'#6a6a6a'}}
                                    onClick={()=>setPartOfEnc(!partOfEnc)} 
                                    checkedIcon={<CheckBoxOutlinedIcon/>}
                                ></Checkbox>
                        }/>
                    </FormControl>
                </Grid>
                <Grid container item justifyContent="center" columnGap={3}>
                    <Button style={{width:'fit-content'}} variant="contained" onClick={closeAdding}>Cancel</Button>
                    <Button style={{width:'fit-content'}} variant="contained" onClick={saveItem}>Save</Button>
                </Grid>
            </>
        }
    </>)
}