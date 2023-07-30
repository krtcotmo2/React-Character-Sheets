import { Button, Divider, Grid, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loadFeatOfTypes, loadFeatTypes } from './business-logic/new-feat';
import { DefaultFeat, Feat } from '../../interfaces/feats';


interface NewFeatProps{
    cancel: (b: boolean) => void;
}
export const NewFeat: React.FC<NewFeatProps> = (props: NewFeatProps): JSX.Element => {

    const {cancel} = props;
    const [featTypes, setFeatTypes] = useState<string[]>([]);
    const [availableFeats, setAvailableFeats] = useState<DefaultFeat[]>([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedFeat, setSelectedFeat] = useState('');

    useEffect( () => {
        loadFeatTypes().then(arg => setFeatTypes(arg));

    },[]);

    const getTypesOf = (typ: string) =>{
        setSelectedType(typ);
        setSelectedFeat('');
        loadFeatOfTypes(typ).then(arg => setAvailableFeats(arg));
    }
    const setFeat = (ft: string) =>{
        setSelectedFeat(ft);
    }

    return (<>
        <Grid container direction='row' gap={4} justifyContent='center'>
            <Grid item>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedType}
                    placeholder='Type'
                    style={{minWidth:'200px', backgroundColor:'white', textAlign:'left'}}
                    onChange={(event)=> getTypesOf(event.target.value)}
                >
                    {featTypes.map( (typ: string)=> {
                        return (
                            <MenuItem value={typ}>{typ}</MenuItem>
                        )
                    })}
                </Select>
            </Grid>
            <Grid item>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    placeholder='Feat'
                    value={selectedFeat}
                    style={{minWidth:'200px', backgroundColor:'white', textAlign:'left'}}
                    onChange={(event)=> setFeat(event.target.value)}
                >
                    {availableFeats.map( (feat: DefaultFeat)=> {
                        return (
                            <MenuItem value={feat.name}>{feat.name}</MenuItem>
                        )
                    })}
                </Select>
            </Grid>
        </Grid>
        <Grid container direction='row' gap={4} justifyContent='center' style={{margin:'24px 0'}}>
            <Button variant="contained" onClick={ () => cancel(false) } >Cancel</Button> 
            <Button variant="contained">Save</Button> 
        </Grid>
        { selectedFeat !== '' && 
            <Grid container direction='column' gap={4} justifyContent='center' style={{margin:'24px 0', width:'600px'}}>
                <Grid item style={{textAlign:'left'}}> Prerequisite: {availableFeats.find(ft => ft.name === selectedFeat)?.prerequisites || 'none'} </Grid>
                <Grid item style={{textAlign:'left'}}> {availableFeats.find(ft => ft.name === selectedFeat)?.shortdescription} </Grid>
                <Grid item style={{textAlign:'left'}}> {availableFeats.find(ft => ft.name === selectedFeat)?.benefit} </Grid>
                <Grid item style={{textAlign:'left'}}> {availableFeats.find(ft => ft.name === selectedFeat)?.normal} </Grid>
                <Grid item style={{textAlign:'left'}}> {availableFeats.find(ft => ft.name === selectedFeat)?.special} </Grid>
            </Grid>
        }

    </>)
}