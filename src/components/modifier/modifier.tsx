import { Button, Divider, FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
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
                state
            );
        }else{
            await saveModifier(
                char,
                modified,
                state,
                modifiers
            );
        }
        navigate(`${getNavigateUrl(state.whatIsMod, char.charID.toString())}`);
    }
    const char: Character = useSelector(state => store.getState().character);
    return (
        <Grid container direction='column' justifyContent="center" alignItems='center'>
            <Grid item style={{alignSelf:'center'}}>
                <p><Link className='nonDecLink' to={`${getNavigateUrl(state.whatIsMod, char.charID.toString())}`}>{char?.charName}</Link> - {state.modified}</p>
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