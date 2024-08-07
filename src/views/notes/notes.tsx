import React, {useEffect, useState} from 'react';
import { store } from '../../redux/configure-store';
import { useSelector } from 'react-redux';
import { Character } from '../../interfaces/character';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import { getCharacterNotes, sendNewNote } from '../../api/notes-api';
import { Note } from '../../interfaces/note';
import { Link } from 'react-router-dom';
import { NoteGroup } from '../../components/notes/note-group';
import { showError } from '../../components/modal/business-logic/error-handler';
import ClearIcon from '@mui/icons-material/Clear';
import { FilterBar } from '../../components/filter-bar/filter-bar';

export const CharacterNotes: React.FC = (): JSX.Element => {
    const char: Character = useSelector((state) => store.getState().character);
    const [isAdding, setIsAdding] = useState(false);
    const [noteName, setNoteName] = useState('');
    const [listFilter, setListFilter] = useState('');
    const [notes, setNotes] = useState<Note[]>([])
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
    useEffect(() => {
        getCharacterNotes(char.charID.toString())
         .then(theNotes => {
            setNotes(theNotes);
            setFilteredNotes(theNotes);
          })
    }, []);

    useEffect(()=> {
        setFilteredNotes(notes.filter(note => 
            note.noteTitle.toLocaleLowerCase().includes(listFilter.toLocaleLowerCase()) ||
            note.notes.some(indNote => indNote.itemDetails.toLowerCase().includes(listFilter.toLocaleLowerCase()))
        ));
    },[listFilter, notes])

    const createNote = () => {
        if(noteName === ''){
            showError('note_missing_title');
            return;
        }
        const n: Note = {
            charID: char.charID,
            noteID: 0,
            noteTitle: noteName,
            notes:[],
            noteOrder:notes.length,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        sendNewNote(n, char.charID.toString()).then(theNotes => {
            setNotes(theNotes);
            setNoteName('');
            setIsAdding(false);
        })

    }
    return (
        <>
             <Grid container>
                <Grid container item justifyContent="center">
                <p>
                    <Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Notes
                    <Link className='topLink' to={`/character/spells/${char.charID}`} title="Spells"><img className='topLineIcons' src='/images/clean.svg'/></Link>
                    <Link className='topLink' to={`/character/expendables/${char?.charID}`} title="Expendables"><img className='topLineIcons' src='/images/testing-tube.svg'/></Link>
                </p>
                </Grid>
            </Grid>
            <FilterBar value={listFilter} setValue={setListFilter}/>
            <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
                {filteredNotes.map(note => {
                    return (
                        <NoteGroup grp={note} isAdding={isAdding} hidden={true}/>
                    )
                })}
            </Grid>
            {!isAdding &&
                <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
                    <Button style={{width:'fit-content', margin:'12px 0'}} variant="contained" onClick={()=>setIsAdding(true)}>Add New Note</Button>
                </Grid>
            }
            {isAdding &&
                <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
                    <Grid item justifyContent={"center"} style={{fontSize:'18px'}} className="standardRow">
                        <TextField
                            style={{display:'flex', flexGrow:'1'}} 
                            value={noteName}
                            onChange={ (evt)=> setNoteName(evt.target.value) }
                            placeholder='Note Title'
                            multiline
                        />
                    </Grid>
                    <Grid container direction="row" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList" columnGap={3}>
                        <Button style={{width:'fit-content', margin:'12px 0'}} variant="contained" onClick={()=>setIsAdding(false)}>Cancel</Button>
                        <Button style={{width:'fit-content', margin:'12px 0'}} variant="contained" onClick={createNote}>Save</Button>
                    </Grid>
                </Grid>
            }
        </>
    )
}