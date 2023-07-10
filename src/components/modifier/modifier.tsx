import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { WHATISMOD } from "../../enum/what-is-mod-type";
import { Modifier } from "../../interfaces/modifier";
import { Link, useLocation } from "react-router-dom"
import { getModifiers, getReducer, getStatToModify } from "./business-logic/modifier-helper";
import { Character } from "../../interfaces/character";
import { Expendable } from "../../interfaces/expendable";
import { Feat } from "../../interfaces/feats";
import { CharLevel } from "../../interfaces/levels";
import { SavingThrow } from "../../interfaces/saving-throw";
import { RawSkill } from "../../interfaces/skills";
import { Stat } from "../../interfaces/stat";
import { ModifierRow } from "./modifier-row";
import { useSelector } from "react-redux";
import { store } from "../../redux/configure-store";

interface ModifierProps {
    whatIsMod?: any;
    modified?: any;
    saveFunction?: () => void;
}


export const ModifierView: React.FC<ModifierProps> = (props: ModifierProps): JSX.Element => {
    const { state } = useLocation();
    const emptyModifiers: Modifier[] = [];
    const [modifiers, setModifiers] = useState(emptyModifiers);
    const [modified, setModified] = useState<Modifier[]>([]);
    
    useEffect(() => {
        const theReducer = getReducer(state.whatIsMod || '');
        const mods = getModifiers(state.modified, theReducer);
        setModifiers(mods);
    },[]);

    const updateModified = (m: Modifier) => {
        const newVals = [
            ...modified.filter(item => item.id !== m.id),
            m
        ]
        setModified(newVals)
        console.log(newVals);
    }
    const checkDelta = (modifiers: Modifier[]) => {
        const needsUpdates: Modifier[] = [];
        modified.forEach(mod => {
            const oldVal = modifiers.find(old => old.id === mod.id);
            if(oldVal?.modDesc !== mod.modDesc || oldVal?.score !== mod.score){
                needsUpdates.push(mod);
            }
            console.log(needsUpdates)
        })
    }
    const char: Character = useSelector(state => store.getState().character);
    return (
        <Grid container direction='column' justifyContent="center" alignItems='center'>
            <Grid item style={{alignSelf:'center'}}>
                <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - {state.modified}</p>
            </Grid>
            <Grid direction='column' rowGap={2} style={{display:"flex"}}>
                <Grid container direction='column' rowGap={2} item alignContent='center'>
                    {
                        modifiers?.map( 
                            (m: Modifier, i) => (<ModifierRow modifier={m} index={i} saveFunction={updateModified}/>)
                        )
                    }
                </Grid>
            </Grid>
            <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
            <Grid direction='row' rowGap={2} style={{display:"flex"}} columnGap={2}>
                <Button style={{width:'fit-content'}} variant="contained">Add New Modifier</Button>
                <Button style={{width:'fit-content'}} variant="contained" onClick={() => checkDelta(modifiers)}>Save</Button>
            </Grid>
        </Grid>
    )
};