import React, {useEffect, useState} from 'react';
import { Feat } from '../../interfaces/feats';
import { getCharacterFeats } from '../../api/feats-api';
import { store } from '../../redux/configure-store';
import { FeatsActions } from '../../redux/reducers/feates-reducer';
import { useSelector } from 'react-redux';
import { Character } from '../../interfaces/character';
import { Grid } from '@mui/material';
import { CollapsibleRow } from '../../components/collapsible-row/collapsible-row';
import { Link } from 'react-router-dom';

export const CharacterFeats: React.FC = (): JSX.Element => {
    const [feats, setFeats] = useState<Feat[]>([]);
    const char: Character = useSelector((state) => store.getState().character);

    useEffect( () => {
        getCharacterFeats(store.getState().character.charID.toString())
        .then( currentFeats => {
            setFeats(currentFeats);
            store.dispatch(FeatsActions.setCharFeats(currentFeats));
        })
    },[])

    return(
        <>
        <Grid container>
            <Grid container item justifyContent="center">
            <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Feats</p>
            </Grid>
        </Grid>
        <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
        {feats.map(feat => {
            return (
                <Grid item className="standardRow">
                    <CollapsibleRow title={feat.desc.name} breakdown={[]}/>
            
                   
                </Grid>
            )
        })}

        </Grid>
        </>
    )
}