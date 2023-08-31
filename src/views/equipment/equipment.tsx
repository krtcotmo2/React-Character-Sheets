import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilterBar } from '../../components/filter-bar/filter-bar';
import { store } from '../../redux/configure-store';
import { Character } from '../../interfaces/character';
import { useSelector } from 'react-redux';
import { getCharacterEquipment } from '../../api/equipment-api';
import { EquipmentActions } from '../../redux/reducers/equipment-reducer';
import { Equipment } from '../../interfaces/equipment';
import { carryCap } from '../../enum/carry-capacity';
import { Stat } from '../../interfaces/stat';

export const EquipmentView: React.FC = (): JSX.Element => {
    const char: Character = useSelector((state) => store.getState().character);
    const stats: Stat = useSelector((state) => store.getState().stats);
    const [listFilter, setListFilter] = useState('');
    const [addingNew, setAddingNew] = useState(false);
    const [fullList, setFullList] = useState<Equipment[]>([]);
    const [encumberance, setEncumberance] = useState('');
    const [theStuff, setEquip] = useState<Equipment[]>([]);
    const [theWeight, setTheWeight] = useState(0);

    useEffect( () => {
        getCharacterEquipment(store.getState().character.charID.toString())
           .then( curEquipment => {
                setFullList(curEquipment.items);
                setEquip(curEquipment.items);
                setTheWeight(curEquipment.weight);
                const enc = carryCap.find(row => row.str === stats.str.value ?? 1);
                if( (enc?.heavy ?? 0) <= curEquipment.weight){
                    setEncumberance('Heavy Encumbrance');
                }else if((enc?.light ?? 0) >= curEquipment.weight  ){
                    setEncumberance('Light Encumbrance');
                
                } else {
                    setEncumberance('Medium Encumbrance');
                }
                store.dispatch(EquipmentActions.setCharEquipment(curEquipment));
           })
    },[]);

    useEffect( () => {
        
        setEquip(fullList.filter(item => item.equip.toLowerCase().includes(listFilter.toLowerCase())));
    }, [listFilter]);
    return(<>
        <Grid container>
            <Grid container item justifyContent="center">
            <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Equipment</p>
            </Grid>
        </Grid>
        <FilterBar value={listFilter} setValue={setListFilter}/>
        <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
            {encumberance}
        </Grid>
        <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
            {
                theStuff.map(item => { 
                    return (<p>{item.equip} - {item.weight}{item.partOfOverallWeight? '':'*'}</p>)
                }
            )}
        </Grid>
        
        { !addingNew &&
            <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
                <Button style={{width:'fit-content'}} variant="contained" onClick={()=>setAddingNew(true)}>Add New Item</Button>
            </Grid>
        }
        { addingNew &&
            <Grid container item justifyContent="center" columnGap={3}>
                <Button style={{width:'fit-content'}} variant="contained" onClick={()=>setAddingNew(false)}>Cancel</Button>
                <Button style={{width:'fit-content'}} variant="contained" >Save</Button>
            </Grid>
        }
    </>)
}