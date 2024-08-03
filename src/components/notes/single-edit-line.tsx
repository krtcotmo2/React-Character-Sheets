import React, { useState } from 'react';
import { NoteItem } from '../../interfaces/note';

import { FormControl, Grid, TextField } from '@mui/material';
import Delete from '@mui/icons-material/Delete';

export interface NoteProps {
    item: NoteItem;
    onChange: (id: number, newText:string) => void;
    onDelete: (id: number)=> void;
}
export const SingleLineEdit: React.FC<NoteProps> = (props: NoteProps): JSX.Element => {
    const {item} = props;
    const [itemDetails, setItemDetails] = useState(item.itemDetails)

    return (
        <Grid container item direction='row' justifyContent='space-between' wrap='nowrap' alignItems='center'>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                    value={itemDetails}
                    placeholder='Note'
                    multiline
                    onChange={(event) => {
                        setItemDetails(event.target.value);
                        props.onChange(item.id, event.target.value);
                    }}
                    
                    />
            </FormControl>
            <Delete style={{margin:'0 12px'}} onClick={()=>props.onDelete(item.id)}></Delete>   
        </Grid>)
}