import React from 'react';
import { Grid } from '@mui/material';

import { SavingThrow } from "../../interfaces/saving-throw";
import { Link } from 'react-router-dom';
import { Character } from '../../interfaces/character';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';

export const SavesBar: React.FC<SavesProps> = (props: SavesProps):JSX.Element => {

    const char: Character = useSelector(state => store.getState().character);
    const { fortitude, reflex, will} = props.saves;
    return (
      <>
        <Grid item>
          <Link style={{display:'block', margin:'18px 0'}} to={`/character/save/${char.charID}`}>Saves</Link>
        </Grid>
        <Grid item>
          <p>Fort: {fortitude.value}</p>
        </Grid>
        <Grid item>
          <p>Reflex: {reflex.value}</p>
        </Grid>
        <Grid item>
          <p>Will: {will.value}</p>
        </Grid>
      </>
    );
}

interface SavesProps{
    saves: SavingThrow;
}