import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { createCharacterExpendables, deleteCharacterExpendables, getCharacterExpendables } from '../../api/expenndables-api';
import { ExpendableAction } from '../../redux/reducers/expendables-reducer';
import { Character } from '../../interfaces/character';
import { Button, Divider, Grid, MenuItem, Select, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { ExpendableBar } from '../../components/expendables/expendable-bar';
import { ExpendableType } from '../../enum/expendable-type';

export const ExpendablesView: React.FC = (): JSX.Element => {
    const char: Character = useSelector((state) => store.getState().character);
    const expendables = useSelector(state => store.getState().expendables);
    const [addingNew, setAddingNew] = useState(false);
    const [desc, setDesc] = useState('');
    const [score, setScore] = useState('');
    const [expType, setExpType] = useState('');
    
    useEffect( () => {
     getCharacterExpendables(store.getState().character.charID.toString())
        .then( curExpendables => {
            store.dispatch(ExpendableAction.setExpendable(curExpendables));
        })
    },[])

    const newExpendable = () => {
        setAddingNew(true);
    }
    const cancel = () => {
        setAddingNew(false);
    }
    const saveNew = async () => {
        const exp = {
            charID: +char.charID,
            description: desc,
            qty: +score,
            id: 0,
            expType: expType as ExpendableType
        }
        const newList = await createCharacterExpendables(exp);
        store.dispatch(ExpendableAction.setExpendable([]));
        store.dispatch(ExpendableAction.setExpendable(newList));
        setAddingNew(false);
        setScore('');
        setExpType('');
        setDesc('');
    }
    return(
        <>
        <Grid container>
            <Grid container item justifyContent="center">
            <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Expendables</p>
            </Grid>
        </Grid>
        <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
            {expendables.map((expendable, i) => {
                return (
                    <ExpendableBar key={`bar-${i}`} {...expendable} addingNew={addingNew}/>
                )
            })}
            
            <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
            { 
                !addingNew
                &&
                <Button style={{width:'fit-content'}} variant="contained" onClick={newExpendable}>Add New Expendable</Button>
            }
            { 
                addingNew
                && 
                <Grid container direction='column' rowGap={3} style={{justifyContent: 'space-around', width:'600px'}}>
                    <Grid container item justifyContent="center" columnGap={3}>
                        <TextField
                            placeholder='Description'
                            required
                            value={desc}
                            InputProps={{  }}
                            onChange={evt => setDesc(evt.target.value)}
                            style={{flexGrow: 1}}
                        />
                         <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            placeholder="Type"
                            value={expType}
                            onChange={(event => setExpType(event.target.value))}
                            >
                            <MenuItem value='Class'>Class</MenuItem>
                            <MenuItem value='Charge'>Charge</MenuItem>
                            <MenuItem value='Potion'>Potion</MenuItem>
                            <MenuItem value='Scroll'>Scroll</MenuItem>
                        </Select>
                        <TextField
                            placeholder='Value'
                            required    
                            type="number"
                            value={score}
                            InputProps={{ inputProps: {step: "1" } }}
                            onChange={evt => setScore(evt.target.value)}
                        />
                    </Grid>               
                    <Grid container item justifyContent="center" columnGap={3}>
                        <Button style={{width:'fit-content'}} variant="contained" onClick={cancel}>Cancel</Button>
                        <Button style={{width:'fit-content'}} variant="contained" onClick={saveNew}>Save</Button>
                    </Grid>
                </Grid>
            }
        </Grid>
        </>
    )
}