import React, { useState } from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/configure-store";
import { SavingThrow } from "../../interfaces/saving-throw";
import { CollapsibleRow } from "../collapsible-row/collapsible-row";
import { Button, Divider, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { Character } from "../../interfaces/character";
import { addTempUpdate } from "./business-logic/add-temp-adj-helper";
import { SavesActions } from "../../redux/reducers/saves-reducer";
import { IOSSwitch } from "../ios-switch/ios-switch";

export interface  FormProps  {
    items: FromInput[];
    showMethod: () => void;
    onSubmit?: ()=>{};
    category: string;
}
export interface FromInput {
    label: string;
    propName: string;
    
}

export const AddTempAdjustment: React.FC<FormProps> = (props: FormProps): JSX.Element => {
    const {items, showMethod, category} = props;
    const [selected, setSelected] = useState<string[]>([]);
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');

    const submit = () => {
        if(selected.length < 1 || value.trim() === '' || description.trim() === ''){
            return;
        }
        addTempUpdate(value, category, selected, description);
        setValue('');
        setDescription('');
        showMethod();
    }
    const filterSelected = (event:any, value:string) => {
        const checked = event.target.checked;
        const list = checked ? [...selected, value] : selected.filter(item => item !== value);
        setSelected(list);
    }
    return (
        <Grid container direction='column' gap={4} >
            <Grid container direction='row' gap={4} justifyContent='center'>
                <Grid item><TextField id="outlined-basic" label="Score" variant="outlined" onChange={(event)=>setValue(event.target.value)}/></Grid>
                <Grid item><TextField id="outlined-basic" label="Description" variant="outlined" onChange={(event)=>setDescription(event.target.value)}/></Grid>
            </Grid>
            <Grid container direction='row' justifyContent='center'>
                <Grid item>
                    {items.map(item => {
                        return (
                            <FormControlLabel
                                control={
                                    <IOSSwitch aria-label={item.label} onChange={(event) => filterSelected(event, item.label.toLowerCase())}/>
                                }
                                label={item.label}
                                labelPlacement="start"
                            />
                        )})
                    }        
                </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='center'>
                <Button onClick={submit} variant="contained">Submit</Button>
            </Grid>
        </Grid>
    ) 
}