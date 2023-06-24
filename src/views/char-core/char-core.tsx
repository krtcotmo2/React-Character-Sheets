import React, {useEffect, useState} from 'react';
import { Feat } from '../../interfaces/feats';
import { getCharacterFeats } from '../../api/feats-api';
import { store } from '../../redux/configure-store';
import { FeatsActions } from '../../redux/reducers/feates-reducer';
import { useSelector } from 'react-redux';
import { Character } from '../../interfaces/character';
import { Grid } from '@mui/material';
import { CollapsibleRow } from '../../components/collapsible-row/collapsible-row';
import { CharLevel } from '../../interfaces/levels';

export const CharacterCore: React.FC = (): JSX.Element => {
    const char: Character = useSelector((state) => store.getState().character);
    const levels: CharLevel[] = useSelector((state) => store.getState().levels);

    
    useEffect( () => {
    },[])

    return(
        <>
        <Grid container>
            <Grid container item justifyContent="center">
                <p>{char?.charName} - Core</p>
            </Grid>
        </Grid>
        <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
            <Grid container item direction={'row'} wrap='nowrap' gap={2}>
                <img src={`https://dd-characters.herokuapp.com/assets/${char.image}`}/>
                <Grid container direction={'column'} justifyContent={'flex-start'} alignContent={'flex-start'}>
                    <p style={{textAlign:'left'}}>Alignment: {char.alignment}</p>
                    <p style={{textAlign:'left'}}>Race: {char.race}</p>
                    <p style={{textAlign:'left'}}>Hit Points: {char.charHP}</p>
                    <p style={{textAlign:'left'}}>Initiative: {char.init}</p>
                </Grid>
                <Grid container direction={'column'} justifyContent={'flex-start'} alignContent={'flex-start'}>
                    <p>Levels</p>
                    {levels.map((lvl) => {
                            return (<p>{`Level: ${lvl.className} - ${lvl.classLevel}`}</p>)
                        }
                    )}
                </Grid>
            </Grid>

        </Grid>
        </>
    )
}