import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { Expendable } from '../../interfaces/expendable';
import { getCharacterExpendables } from '../../api/expenndables-api';
import { ExpendableAction } from '../../redux/reducers/expendables-reducer';
import { Character } from '../../interfaces/character';
import { Grid } from '@mui/material';

export const ExpendablesView: React.FC = (): JSX.Element => {
    const char: Character = useSelector((state) => store.getState().character);
    const [expendables, setExpendables] = useState<Expendable[]>([]);
    useEffect( () => {
     getCharacterExpendables(store.getState().character.charID.toString())
        .then( curExpendables => {
            setExpendables(curExpendables);
            store.dispatch(ExpendableAction.setExpendable(curExpendables));
        })
    },[])

    return(
        <>
        <Grid container>
            <Grid container item justifyContent="center">
                <p>{char?.charName} - Expendables</p>
            </Grid>
        </Grid>
        {expendables.map(expendable => {
            return (<p>{expendable.description} {expendable.qty} {expendable.expType}</p>)
        })}
        </>
    )
}