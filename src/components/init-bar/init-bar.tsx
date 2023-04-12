import React from 'react';
import { Grid } from '@mui/material';


export const InitBar: React.FC<InitProp> = (char: InitProp):JSX.Element => {
    return (
      <Grid item>
          <p>Initiative: {char.init}</p>
        </Grid>
    );
}

interface InitProp{
    init: number;
}