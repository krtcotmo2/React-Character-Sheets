import React, {useEffect, useState} from 'react';
import { Feat } from '../../interfaces/feats';
import { getCharacterFeats } from '../../api/feats-api';
import { store } from '../../redux/configure-store';
import { FeatsActions } from '../../redux/reducers/feates-reducer';
import { useSelector } from 'react-redux';
import { Character } from '../../interfaces/character';
import { Grid } from '@mui/material';
import { getCharacterNotes } from '../../api/notes-api';
import { Note } from '../../interfaces/note';

export const CharacterNotes: React.FC = (): JSX.Element => {
    const char: Character = useSelector((state) => store.getState().character);
    const [notes, setNotes] = useState<Note[]>([])
    useEffect(() => {
        getCharacterNotes(char.charID.toString()).
        then(theNotes => {
            setNotes(theNotes);
        })
    }, []);
    return (
        <>
             <Grid container>
                <Grid container item justifyContent="center">
                    <p>{char?.charName} - Notes</p>
                </Grid>
            </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
                {notes.map(note => {
                    return (
                        <Grid item className="standardRow">
                            <p>{note.noteTitle}</p>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
}