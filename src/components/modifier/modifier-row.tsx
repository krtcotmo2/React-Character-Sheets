import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Modifier } from "../../interfaces/modifier";
import { getModDescription, getModifiers, getReducer } from "./business-logic/modifier-helper";

export interface ModifierProps {
    whatIsMod?: string;
    modified?: any;
    saveFunction?: () => void;
}


export const ModifierRow: React.FC<ModifierProps> = (props: ModifierProps): JSX.Element => {
    const emptyModifiers: Modifier[] = [];
    const {modified, whatIsMod} = props;
    const [modifiers, setModifiers] = useState(emptyModifiers);

    useEffect(() => {
        const theReducer = getReducer(whatIsMod || '');
        const mods = getModifiers(modified, theReducer);
        setModifiers(mods);
    },[]);
    return <>
        <Grid direction='column' rowGap={2} style={{display:"flex"}}>
            <Grid item style={{alignSelf:'center'}}>
                <h1>{props.modified}</h1>
            </Grid>
                {modifiers.map( (m: Modifier, i) => (
                    <Grid container item justifyContent="center" direction='row' columnGap={2} >                            
                        <Grid item style={{alignSelf:'center', alignItems:'center', display:'flex'}}>
                            <span style={{paddingRight: '12px'}}>{i+1}.</span>
                            <TextField
                                required    
                                type="number"
                                value={m.score}
                                InputProps={{ inputProps: {step: "1" } }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                value={m.modDesc}
                            />
                        </Grid>
                    </Grid>
                ))}


        </Grid>
            {/* {modifiers.map( (i: Modifier) => (<p>ModRow {i.score} {getModDescription(i, whatIsMod || '')}</p>))} */}
    </>
    
};