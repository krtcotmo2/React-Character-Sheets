import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Modifier } from "../../interfaces/modifier";
import Delete from '@mui/icons-material/Delete';

export interface ModifierProps {
    modifier?: Modifier;
    saveFunction?: () => void;
    index: number;
}


export const ModifierRow: React.FC<ModifierProps> = (props: ModifierProps): JSX.Element => {
    const {modifier, index} = props;
    return <>
        <Grid container item style={{width:'fit-content'}} columnGap={2} alignItems='center'>                            
            <Grid item  style={{display:'flex', alignItems:'center'}}>
                <span style={{paddingRight: '12px'}}>{index+1}.</span>
                <TextField
                    required    
                    type="number"
                    value={modifier?.score}
                    InputProps={{ inputProps: {step: "1" } }}
                    disabled={modifier?.id===0}
                />
            </Grid>
            <Grid item>
                <TextField
                    value={modifier?.modDesc}
                    disabled={modifier?.id===0}
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