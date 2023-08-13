import React, { useEffect, useState } from 'react';
import { Note, NoteItem } from '../../interfaces/note';

import { Link, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Character } from '../../interfaces/character';
import { store } from '../../redux/configure-store';
import { Grid } from '@mui/material';
export interface NoteTitleProps {
    
}
export const NoteNewUpdate: React.FC = (): JSX.Element => {
    const char: Character = useSelector(state => store.getState().character);
    const { state } = useLocation();
    const [note, setNote] = useState<Note>(state.note)
    return (
        <Grid container>
            <Grid container>
                <Grid container item justifyContent="center">
                <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Note</p>
                </Grid>
            </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
            <Grid item>{note.noteTitle}</Grid>
                {note.notes.map( (item) => {
                        return (<Grid item style={{textAlign:'left', width:'100%'}}>{item.itemDetails}</Grid>)
                    })
                }

            </Grid>
        </Grid>
    )
}