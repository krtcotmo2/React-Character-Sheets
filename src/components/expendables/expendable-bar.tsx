import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { Expendable } from '../../interfaces/expendable';
import { deleteCharacterExpendables, getCharacterExpendables, updateCharacterExpendables } from '../../api/expenndables-api';
import { ExpendableAction } from '../../redux/reducers/expendables-reducer';
import { Character } from '../../interfaces/character';
import { Button, Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { ExpendableType } from '../../enum/expendable-type';
import { AddCircleOutline, Delete, PinDrop, RemoveCircleOutline } from '@mui/icons-material';
import PushPinIconOutlined from '@mui/icons-material/PushPinOutlined';

interface expendableProps{
    id: string | number,
    expType: ExpendableType | undefined,
    qty: number,
    description: string,
    addingNew: boolean,
}

export const ExpendableBar: React.FC<expendableProps> = (props: expendableProps): JSX.Element => {
    const {id, expType, qty, description} = props;
    const [itemQty, setItemQty] = useState<number>(qty);
    const char = useSelector( state => store.getState().character);
    
    const adjustExpCount = async (val:number) => {
        if(props.addingNew){
            return
        }
        if(qty + val < 0){
            return;
        }
        const exp:Expendable = {
            charID: +char.charID,
            id: id, 
            qty: qty + val,
            description,
            expType,
        }
        await updateCharacterExpendables(char.charID.toString(), exp)
        store.dispatch(ExpendableAction.updateSingleExpendable(exp));
    }
    const trashExpendable = async (id: string) => {
        const newList = await deleteCharacterExpendables(id, char.charID.toString());
        store.dispatch(ExpendableAction.setExpendable(newList));
    }
    
    return <>
        <Grid direction={'row'} container className="standardRow" style={{textAlign:'left', padding:'8px'}}>
            <Grid item alignContent='flex-start' xs={7} flexGrow={1}>{description}</Grid>
            <Grid item xs={3}>{expType}</Grid>
            <Grid  container direction='row' item xs={2}>
                <Grid item flexShrink={1}> 
                    <RemoveCircleOutline style={{cursor:props.addingNew ? 'auto' : 'pointer', padding: '5px 6px', opacity:props.addingNew ? 0.6 : 1}} sx={{ fontSize: 16 }} onClick={()=>adjustExpCount(-1)}/>
                </Grid>
                <Grid>{qty}</Grid>
                <Grid item flexShrink={1}>
                    <AddCircleOutline style={{cursor:'pointer', padding: '5px 6px', opacity:props.addingNew ? 0.6 : 1}} sx={{ fontSize: 16 }} onClick={()=>adjustExpCount(1)}/>
                </Grid>
            </Grid>
            <Grid item flexShrink={1}> <PushPinIconOutlined style={{cursor:'pointer'}}></PushPinIconOutlined></Grid>
            <Grid item flexShrink={1}> <Delete style={{cursor:'pointer'}} onClick={()=>trashExpendable(id.toString())}></Delete></Grid>
        </Grid>
    </>
};