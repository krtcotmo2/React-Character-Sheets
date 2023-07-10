import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { Expendable } from '../../interfaces/expendable';
import { getCharacterExpendables } from '../../api/expenndables-api';
import { ExpendableAction } from '../../redux/reducers/expendables-reducer';
import { Character } from '../../interfaces/character';
import { Button, Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

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
            <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Expendables</p>
            </Grid>
        </Grid>
        <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
            {expendables.map(expendable => {
                return (
                    <Grid item className="standardRow">
                        <p>{expendable.description} {expendable.qty} {expendable.expType}</p>
                    </Grid>
                )
            })}
            
            <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
            <Button style={{width:'fit-content'}} variant="contained">Add New Expendable</Button>
        </Grid>
        </>
    )
}