import { Button, Divider, FormControl, FormControlLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Modifier } from "../../interfaces/modifier";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { addNewModifier, getAddFunction, getModifiers, getNavigateUrl, getReducer, getSaveFunction, getStatToModify, getStateIdFromName, saveModifier } from "./business-logic/modifier-helper";
import { Character } from "../../interfaces/character";
import { ModifierRow } from "./modifier-row";
import { useSelector } from "react-redux";
import { store } from "../../redux/configure-store";

import { StatsActions } from "../../redux/reducers/stats-reducer";
import { SavesActions } from "../../redux/reducers/saves-reducer";
import { ToHitActions } from "../../redux/reducers/to-hit-reducer";
import { updateReducersAfterCharUpdates } from "../../api/skills-api";
import { WHATISMOD } from '../../enum/what-is-mod-type';
import { IOSSwitch } from '../ios-switch/ios-switch';

interface ModifierProps {
    whatIsMod?: any;
    modified?: any;
    saveFunction?: () => void;
}


export const ModifierView: React.FC<ModifierProps> = (props: ModifierProps): JSX.Element => {
    const { state } = useLocation();
    const emptyModifiers: Modifier[] = [];
    const [modifiers, setModifiers] = useState(emptyModifiers);
    const [touchAC, setTouchAC] = useState(false);
    const [flatFootedAC, setFlatFootedAC] = useState(false);
    const [modified, setModified] = useState<Modifier[]>([]);
    const [addingMod, setAddingMod] = useState(false);
    const [newScore, setNewScore] = useState('');
    const [newDesc, setNewDesc] = useState('');

    const navigate = useNavigate();
    
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
        setModified(newVals);
    }
    const checkDelta = async (modifiers: Modifier[]) => {
        if(addingMod){
            await addNewModifier(
                char,
                +newScore,
                newDesc,
                state,
                flatFootedAC,
                touchAC,
            );
        }else{
            await saveModifier(
                char,
                modified,
                state,
                modifiers
            );
        }
        setTimeout( 
            ()=> navigate(`${getNavigateUrl(state.whatIsMod, char.charID.toString())}`)
            , 200
        );
        
    }
    const char: Character = useSelector(state => store.getState().character);
    return (
        <Grid container direction='column' justifyContent="center" alignItems='center'>
            <Grid item style={{alignSelf:'center'}}>
                <p><Link className='nonDecLink' to={`${getNavigateUrl(state.whatIsMod, char.charID.toString())}`}>{char?.charName}</Link> - {state.modified}</p>
                {state.whatIsMod === 'Armor' && (
                    <>
                        <p style={{fontSize: '12px', textAlign: 'left', marginBottom: '0', padding: '0 24px'}}>Armor can be based on a base 10 + Armor Bonus* + Shield Bonus* + Dex Modifier + Deflection Bonus** + Natural Armor*** + Dodge Bonus + Size Modifiers</p>
                        <p style={{fontSize: '12px', textAlign: 'left', margin: '0px', padding: '0 32px'}}>* Enchantments on armor and shield are part of the armor or shield bonus</p>
                        <p style={{fontSize: '12px', textAlign: 'left', margin: '0px', padding: '0 32px'}}>** Rings, bracers and spells can offer deflection bonus. A spell bonus can be added to different areas, check spell details.</p>
                        <p style={{fontSize: '12px', textAlign: 'left', margin: '0', padding: '0 32px', marginBottom: '18px', }}>*** Stacks with armor bonus</p>
                    </>
                    )
                }
            </Grid>
            <Grid direction='column' rowGap={2} style={{display:"flex"}}>
                <Grid container direction='column' rowGap={2} item alignContent='center'>
                    {
                        modifiers?.map( 
                            (m: Modifier, i) => (<ModifierRow modifier={m} index={i} saveFunction={updateModified} addingMod={addingMod}/>)
                        )
                    }
                </Grid>
            </Grid>
            <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
            {addingMod && (
                <>
                    <Grid container item justifyContent="center" direction='row' columnGap={2}>
                        <Grid item style={{alignSelf:'left'}}>
                            <FormControl>
                                <TextField
                                    value={newScore}
                                    onChange={(evt)=> setNewScore(evt.target.value)}
                                    required
                                    type="number"
                                    InputProps={{ inputProps: { step: "1", placeholder: 'Score' } }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item style={{marginBottom: '12px'}}>
                            <TextField
                                    value={newDesc}
                                    onChange={(evt)=> setNewDesc(evt.target.value)}
                                required
                                InputProps={{ inputProps: { placeholder: 'Description' } }}
                            />
                        </Grid>
                        {state.whatIsMod === 'Armor' && (
                            <>
                                <FormControlLabel
                                    control={
                                        <IOSSwitch aria-label='Touch Ac' checked={touchAC} onClick={()=> setTouchAC(!touchAC)}/>
                                    }
                                    label ='Touch AC'
                                    labelPlacement='start'
                                />
                                <FormControlLabel
                                    control={
                                        <IOSSwitch aria-label='Flatfooted' checked={flatFootedAC} onClick={()=> setFlatFootedAC(!flatFootedAC)}/>
                                    }
                                    label ='Flatfooted'
                                    labelPlacement='start'
                                />
                            </>
                        )}
                    </Grid>
                </>
            )}
            <Grid direction='row' rowGap={2} style={{display:"flex"}} columnGap={2}>
                {!addingMod && <Button style={{width:'fit-content'}} variant="contained" onClick={()=>setAddingMod(true)}>Add New Modifier</Button>}
                {addingMod && <Button onClick={()=>setAddingMod(false)} variant="contained" >Cancel</Button> }
                <Button style={{width:'fit-content'}} variant="contained" onClick={() => checkDelta(modifiers)}>Save</Button>
            </Grid>
        </Grid>
    )
};