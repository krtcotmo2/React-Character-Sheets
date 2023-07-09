import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { WHATISMOD } from "../../enum/what-is-mod-type";
import { Modifier } from "../../interfaces/modifier";
import { useLocation } from "react-router-dom"
import { getReducer, getStatToModify } from "./business-logic/modifier-helper";
import { Character } from "../../interfaces/character";
import { Expendable } from "../../interfaces/expendable";
import { Feat } from "../../interfaces/feats";
import { CharLevel } from "../../interfaces/levels";
import { SavingThrow } from "../../interfaces/saving-throw";
import { RawSkill } from "../../interfaces/skills";
import { Stat } from "../../interfaces/stat";
import { ModifierRow } from "./modifier-row";

interface ModifierProps {
    whatIsMod?: any;
    modified?: any;
    saveFunction?: () => void;
}


export const ModifierView: React.FC<ModifierProps> = (props: ModifierProps): JSX.Element => {
    const { state } = useLocation();
    return (
        <>
            
            <Grid container direction='column' justifyContent="center" alignItems='center'>
                <ModifierRow whatIsMod={state.whatIsMod} modified={state.modified}/>
            <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
            <Button style={{width:'fit-content'}} variant="contained">Add New Modifier</Button>
            </Grid>
        </>
    )
};