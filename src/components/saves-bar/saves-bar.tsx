import React from 'react';
import { Grid } from '@mui/material';

import { SavingThrow } from "../../interfaces/saving-throw";

export const SavesBar: React.FC<SavesProps> = (props: SavesProps):JSX.Element => {

    const { fortitude, reflex, will} = props.saves;
    return (
      <>
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