import { Button, Divider, Grid, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFeat, loadFeatOfTypes, loadFeatTypes } from './business-logic/new-feat';
import { DefaultFeat, Feat } from '../../interfaces/feats';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { FeatsActions } from '../../redux/reducers/feates-reducer';
import { CharacterFeats } from '../../views/feats/feats';
import { FeatType } from '../../enum/feat-type';


interface NewFeatProps{
    cancel: (b: boolean) => void;
}
export const NewFeat: React.FC<NewFeatProps> = (props: NewFeatProps): JSX.Element => {

    const {cancel} = props;
    const char = useSelector( state => store.getState().character); 
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

    const saveFeat = () => {
        const feat = availableFeats.find(ft => ft.name === selectedFeat);
        createFeat(char.charID.toString(), feat?.id.toString() || '').then((ft)=>{
            setSelectedFeat('');
            setSelectedType('');
            cancel(false);
            const newFeat: Feat = {
                id: ft.id,
                featID: feat?.id.toString() || '',
                charID: char.charID.toString(),
                desc: {
                    name: feat?.name || '',
                    benefit: feat?.benefit || '',
                    featType: FeatType.COMBAT,
                    shortDescription: feat?.shortdescription || ''
                },

            }
            const charFeats = store.getState().feats;
            store.dispatch(FeatsActions.setCharFeats([...charFeats, newFeat]))
        });
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
            <Button variant="contained" onClick={saveFeat}>Save</Button> 
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