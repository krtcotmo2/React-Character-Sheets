import React, { useEffect, useState } from 'react';
import { Character } from '../../interfaces/character';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { Button, Grid } from '@mui/material';
import { LevelRow } from './level-row';
import { Link } from "react-router-dom";

export const LevelsModified: React.FC = (): JSX.Element => {
    const levels = useSelector(state => store.getState().levels);
    const char = useSelector((state) => store.getState().character);

    const saveLevels = () => {

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
                                <LevelRow level={lvl} updateLevel={(arg) => updateLevel}/>
                            ))}
                        </Grid>
                        <Grid container item justifyContent="center" direction='row' rowGap={5}>
                            {/* <Button>Add New</Button> */}
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </>
    )
}

