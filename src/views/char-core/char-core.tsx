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
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

export const CharacterCore: React.FC = (): JSX.Element => {
    const char: Character = useSelector((state) => store.getState().character);
    const levels: CharLevel[] = useSelector((state) => store.getState().levels);

    
    useEffect( () => {
    },[])

    return(
        <>
        <Grid container>
            <Grid container item justifyContent="center">
            <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Core</p>
            </Grid>
        </Grid>
        <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
            <Grid container item direction={'row'} wrap='nowrap' gap={2}>
                <img src={`https://dd-characters.herokuapp.com/assets/${char.image}`}/>
                <Grid container direction={'column'} justifyContent={'flex-start'} alignContent={'flex-start'}>
                    <div><p style={{textAlign:'left'}}>Alignment: {char.alignment} <EditIcon className='editIcon' /></p></div>
                    <div><p style={{textAlign:'left'}}>Race: {char.race} <EditIcon/></p></div>
                    <div><p style={{textAlign:'left'}}>Hit Points: {char.charHP} <EditIcon/></p></div>
                    <div><p style={{textAlign:'left'}}>Initiative: {char.init} <EditIcon/></p></div>
                </Grid>
                <Grid container direction={'column'} justifyContent={'flex-start'} alignContent={'flex-start'}>
                    <div><p>Levels <EditIcon/></p></div>
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