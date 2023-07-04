import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { WHATISMOD } from "../../enum/what-is-mod-type";
import { Modifier } from "../../interfaces/modifier";

export interface ModifierProps {
    whatIsMod?: any;
    modified?: any;
    saveFunction?: () => void;
}


export const ModifierRow: React.FC<ModifierProps> = (props: ModifierProps): JSX.Element => {
    return (<>ModRow {props.whatIsMod} {props.modified}</>)
};