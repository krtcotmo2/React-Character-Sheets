import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Modifier } from "../../interfaces/modifier";
import Delete from '@mui/icons-material/Delete';
import { useLocation, useNavigate } from "react-router-dom";
import { deleteModifier, getNavigateUrl } from "./business-logic/modifier-helper";
import { Character } from "../../interfaces/character";
import { useSelector } from "react-redux";
import { store } from "../../redux/configure-store";
import { IOSSwitch } from "../ios-switch/ios-switch";
import { Armor } from "../../interfaces/armor";

export interface ModifierProps {
    modifier: Modifier;
    saveFunction: (m: Modifier) => void;
    index: number;
    addingMod?: boolean;
}



export const ModifierRow: React.FC<ModifierProps> = (props: ModifierProps): JSX.Element => {
    const {modifier, index, saveFunction} = props;
    const [score, setScore] = useState(modifier?.score);
    const [touchAc, setTouchAc] = useState(modifier?.aidsTouchAttach);
    const [flatFootedAc, setFlatFootedAc] = useState(modifier?.aidsFlatfoot);
    const [modDesc, setModDesc] = useState(modifier?.modDesc);
    const char: Character = useSelector(state => store.getState().character);
    const { state } = useLocation();
    const navigate = useNavigate();
    
    const changedTextField = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>{
        setModDesc(evt.target.value);
        const m: Modifier = {
            ...modifier,
            modDesc: evt.target.value,
            score,
            aidsTouchAttach: touchAc,
            aidsFlatfoot: flatFootedAc
           }
        saveFunction(m);
    }
    
    const changedScoreField = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setScore(+evt.target.value);
        const m: Modifier = {
            ...modifier,
            score: +evt.target.value,
            modDesc,
            aidsTouchAttach: touchAc,
            aidsFlatfoot: flatFootedAc
        }
        saveFunction(m);
    }

    const changedTouchAC = () => {
        const curState = touchAc;
        setTouchAc(!curState);
        const m: Modifier = {
            ...modifier,
            aidsTouchAttach: !curState,
            aidsFlatfoot: flatFootedAc
        }
        saveFunction(m);
    }

    const changedFlatFootedAC = () => {
        const curState = flatFootedAc;
        setFlatFootedAc(!curState);
        const m: Modifier = {
            ...modifier,
            aidsFlatfoot: !curState,
            aidsTouchAttach: touchAc
        }
        saveFunction(m)
    }

    const deleteLine = async (id: number) => {
        await deleteModifier(char, state, id);
        navigate(`${getNavigateUrl(state.whatIsMod, char.charID.toString())}`);
    }

    return <>
        <Grid container item style={{width:'fit-content'}} columnGap={2} alignItems='center'>                            
            <Grid item  style={{display:'flex', alignItems:'center'}}>
                <span style={{paddingRight: '12px'}}>{index+1}.</span>
                <TextField
                    required    
                    type="number"
                    value={score}
                    InputProps={{ inputProps: {step: "1" } }}
                    disabled={modifier?.id===0 || props.addingMod}
                    onChange={evt => changedScoreField(evt)}
                />
            </Grid>
            <Grid item>
                <TextField
                    value={modDesc}
                    disabled={modifier?.id===0 || props.addingMod}
                    onChange={evt => changedTextField(evt)}
                />
            </Grid>
            {state.whatIsMod === 'Armor' && modifier?.id !==0 && (
                <Grid item>
                    <>
                        <FormControlLabel
                            control={
                                <IOSSwitch aria-label='Touch Ac' checked={touchAc} onClick={() => changedTouchAC()}/>
                            }
                            label ='Touch AC'
                            labelPlacement='start'
                            disabled={props.addingMod}
                        />
                        <FormControlLabel
                            control={
                                <IOSSwitch aria-label='Flatfooted' checked={flatFootedAc} onClick={()=> changedFlatFootedAC()}/>
                            }
                            label ='Flatfooted'
                            labelPlacement='start'
                            disabled={props.addingMod}
                        />
                    </>
                </Grid>
            )}
            <Grid item>
                {modifier?.id!==0 && (
                    <Delete onClick={()=>deleteLine(modifier.id)} style={{cursor:'pointer'}}></Delete>
                )}
            </Grid>
        </Grid>
    </>
    
};