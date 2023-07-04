import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { WHATISMOD } from "../../enum/what-is-mod-type";
import { Modifier } from "../../interfaces/modifier";
import { useLocation } from "react-router-dom"

interface ModifierProps {
    whatIsMod?: any;
    modified?: any;
    saveFunction?: () => void;
}


export const ModifierView: React.FC<ModifierProps> = (props: ModifierProps): JSX.Element => {
    const { state } = useLocation();
    return (<>Mod {state.whatIsMod} {state.modified}</>)
};