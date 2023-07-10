import React, {useEffect, useState} from 'react';
import { Feat } from '../../interfaces/feats';
import { getCharacterFeats } from '../../api/feats-api';
import { store } from '../../redux/configure-store';
import { FeatsActions } from '../../redux/reducers/feates-reducer';
import { useSelector } from 'react-redux';
import { Character } from '../../interfaces/character';
import { Button, Divider, Grid } from '@mui/material';
import { getCharacterNotes } from '../../api/notes-api';
import { Note } from '../../interfaces/note';
import { Link } from 'react-router-dom';

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
                <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Notes</p>
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
                
                <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
                <Button style={{width:'fit-content'}} variant="contained">Add New Note</Button>
            </Grid>
        </>
    );
}