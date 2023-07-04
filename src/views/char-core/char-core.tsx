import React, {useEffect, useState} from 'react';
import { Feat } from '../../interfaces/feats';
import { getCharacterFeats } from '../../api/feats-api';
import { store } from '../../redux/configure-store';
import { FeatsActions } from '../../redux/reducers/feates-reducer';
import { useSelector } from 'react-redux';
import { Character } from '../../interfaces/character';
import { useNavigate } from "react-router-dom";
import { Grid } from '@mui/material';
import { CollapsibleRow } from '../../components/collapsible-row/collapsible-row';
import { CharLevel } from '../../interfaces/levels';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

export const CharacterCore: React.FC = (): JSX.Element => {
    const char: Character = useSelector((state) => store.getState().character);
    const levels: CharLevel[] = useSelector((state) => store.getState().levels);
    const navigate = useNavigate();
    
    useEffect( () => {
    },[])

    const adjustLevels = () => {
        navigate(`/character/levels/${char.charID}`);
    }
    return(
        <>
        <Grid container>
            <Grid container item justifyContent="center">
            <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Core</p>
            </Grid>
        </Grid>
        <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
            <Grid container item direction={'row'} wrap='nowrap' gap={2}>
                <img src={`../images/${char.image}`}/>
                <Grid container direction={'column'} justifyContent={'flex-start'} alignContent={'flex-start'}>
                    <div><p style={{textAlign:'left'}}>Alignment: {char.alignment} <EditIcon className='pointer editIcon' /></p></div>
                    <div><p style={{textAlign:'left'}}>Race: {char.race} <EditIcon className='pointer' /></p></div>
                    <div><p style={{textAlign:'left'}}>Hit Points: {char.charHP} <EditIcon className='pointer' /></p></div>
                    <div><p style={{textAlign:'left'}}>Initiative: {char.init} <EditIcon className='pointer' /></p></div>
                </Grid>
                <Grid container direction={'column'} justifyContent={'flex-start'} alignContent={'flex-start'}>
                    <div><p>Levels <EditIcon className='pointer' onClick={adjustLevels}/></p></div>
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