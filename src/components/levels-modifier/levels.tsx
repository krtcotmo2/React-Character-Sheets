import React, { useEffect, useState } from 'react';
import { Character } from '../../interfaces/character';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { Button, Divider, FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import { LevelRow } from './level-row';
import { Link } from "react-router-dom";
import { charClasses, CharClass } from '../../enum/class-types';
import { SaveLevel } from '../../interfaces/levels';
import { saveALevel } from '../../api/level-api';

export const LevelsModified: React.FC = (): JSX.Element => {
    const levels = useSelector(state => store.getState().levels);
    const char = useSelector((state) => store.getState().character);
    const [newLevel, setNewLevel] = useState('');
    const [newClass, setNewClass] = useState('');
    const [addingStat, setAddingStat] = useState(false);

    const saveLevels = async () => {
        const newLevelAddition: SaveLevel = {
            charID: char.charID,
            id: 0,
            classID: +newClass,
            classLevel: +newLevel,
        }
        await saveALevel(newLevelAddition)
        .then(async results => {
            console.log(results)
        })
    }
    const updateLevel = (arg: number) => {
        console.log(arg);
    }
    return (
        <> 
        <Grid container>
            <Grid container item justifyContent="center">
            <p>
                <Link
                className="nonDecLink"
                to={`/character/${char.charID}`}
                >
                {char?.charName}
                </Link>{" "}
                - Edit Levels
            </p>
            </Grid>
        </Grid>
            <Grid container>
                <Grid container item justifyContent="center" direction='column' rowGap={2}>
                    <form>
                        <Grid container item justifyContent="center" direction='column' rowGap={2}>
                            {levels.map(lvl => (
                                <LevelRow level={lvl} updateLevel={(arg) => updateLevel} addingLevel={addingStat}/>
                            ))}
                        </Grid>
                        <Divider
                            color="#fff"
                            style={{
                                margin: '24px 0',
                            borderTopWidth: "2px",
                            borderTopColor: "#6a6a6a",
                            }}/>
                        {!addingStat && (
                            <Grid container item justifyContent="center" direction='row' rowGap={5} >
                                 <Button onClick={()=>setAddingStat(true)}>Add New</Button> 
                            </Grid>
                        )}
                    </form>
                </Grid>
                {addingStat && (
                    <>
                        <Grid container item justifyContent="center" direction='row' columnGap={2}>
                                <Grid item style={{alignSelf:'left'}}>
                                    <FormControl>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            style={{minWidth: '200px', backgroundColor:'white'}}
                                            onChange={(event)=>setNewClass(event.target.value)}
                                            value={newClass}
                                            >
                                            {charClasses.map( (aClass: CharClass)=> {
                                                return (
                                                    <MenuItem value={aClass.classID}>{aClass.className}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        required
                                        type="number"
                                        value={newLevel}
                                        onChange={(event) => setNewLevel(event.target.value)}
                                        InputProps={{ inputProps: { min: "1", step: "1" } }}
                                    />
                                </Grid>
                        </Grid>
                        <Grid container item justifyContent="center" direction='row' rowGap={5} >
                            <Button onClick={()=>setAddingStat(false)}>Cancel</Button> 
                            <Button onClick={saveLevels}>Save</Button> 
                        </Grid>
                    </>
                ) }
            </Grid>
        </>
    )
}

