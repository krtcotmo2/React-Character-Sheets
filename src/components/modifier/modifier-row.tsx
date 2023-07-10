import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Modifier } from "../../interfaces/modifier";
import Delete from '@mui/icons-material/Delete';

export interface ModifierProps {
    modifier: Modifier;
    saveFunction: (m: Modifier) => void;
    index: number;
}



export const ModifierRow: React.FC<ModifierProps> = (props: ModifierProps): JSX.Element => {
    const {modifier, index, saveFunction} = props;
    const [score, setScore] = useState(modifier?.score);
    const [modDesc, setModDesc] = useState(modifier?.modDesc);

    const changedTextField = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>{
        setModDesc(evt.target.value);
        const m: Modifier = {
            ...modifier,
            modDesc: evt.target.value,
            score
           }
        saveFunction(m);
    }
    const changedScoreField = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setScore(+evt.target.value);
        const m: Modifier = {
            ...modifier,
            score: +evt.target.value,
            modDesc
        }
        saveFunction(m);
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
                    disabled={modifier?.id===0}
                    onChange={evt => changedScoreField(evt)}
                />
            </Grid>
            <Grid item>
                <TextField
                    value={modDesc}
                    disabled={modifier?.id===0}
                    onChange={evt => changedTextField(evt)}
                />
            </Grid>
            <Grid item>
                {modifier?.id!==0 && (
                    <Delete ></Delete>
                )}
            </Grid>
        </Grid>
    </>
    
};