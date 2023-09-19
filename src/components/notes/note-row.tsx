import React, { useEffect, useState } from 'react';
import { store } from '../../redux/configure-store';
import { Checkbox, Grid, TextField, Typography } from '@mui/material';
import { NoteItem } from '../../interfaces/note';
// import { SpellActions } from '../../redux/reducers/spell-reducer';
export interface NoteRowProps {
    note: NoteItem,
    isAdding: boolean,
}

export const NoteRow: React.FC<NoteRowProps> = (props: NoteRowProps): JSX.Element => {
    const {itemDetails} = props.note;
    return (
        <Grid container item className="spellRow vCen" columnGap={1} justifyContent='space-between'>
            <>
                <Typography style={{display:'flex', flexGrow:'1', textAlign:'left', marginBottom:'6px'}}><li></li>{itemDetails}</Typography>
            </>
        </Grid>
    )
}