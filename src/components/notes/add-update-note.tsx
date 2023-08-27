import React, { useEffect, useState } from 'react';
import { Note, NoteItem } from '../../interfaces/note';

import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Character } from '../../interfaces/character';
import { store } from '../../redux/configure-store';
import { Button, Grid, TextField } from '@mui/material';
import { SingleLineEdit } from './single-edit-line';
import { deleteCharacterNotes, sendNewNoteDetail, sendUpdateNotes } from '../../api/notes-api';
import { FilterBar } from '../filter-bar/filter-bar';
export interface NoteTitleProps {
    
}
export const NoteNewUpdate: React.FC = (): JSX.Element => {
    const char: Character = useSelector(state => store.getState().character);
    const { state } = useLocation();
    const navigate = useNavigate();
    const [note, setNote] = useState<Note>(state.note);
    const [isAdding, setIsAdding] = useState(false);
    const [noteText, setNoteText] = useState('');
    const [listFilter, setListFilter] = useState('');

    const updateOneNoteLine = (id: number, newText:string) => {
        const aNote = note.notes.find(n => n.id === id) || {itemDetails:''} as NoteItem;
        aNote.itemDetails = newText; 
        aNote.changed = true;
        const newNote = {
            ...note,
            notes: setNoteOrder([...note.notes.filter(n => n.id !== id), aNote]),
        }
        setNote(newNote);
    }

    const setNoteOrder = (ns:NoteItem[]):NoteItem[] => {
        return ns.sort( (a,b) => {
            if(a.itemOrder < b.itemOrder){
                return -1;
            }else if(a.itemOrder > b.itemOrder){
                return 1
            }
            return 0
        });
    } 

    const deleteNote = (id:number) => {
        deleteCharacterNotes(id.toString(), char.charID.toString()).then( (allNotes) => {
            const reviseNote = allNotes.find(n => n.noteID === note.noteID) || {} as Note;
            setNote({
                ...note,
                notes:[],           
            })
            setTimeout(()=> {
                reviseNote.notes = setNoteOrder(reviseNote.notes);
                setNote(reviseNote);

            }, 10)
        }
        )
    }
    const saveNotes = async () => {
        const updates = note.notes.filter(n => n.changed);
        if(!updates.length){
            navigate(`/character/notes/${char.charID}`);
            return;
        }
        await sendUpdateNotes(updates, char.charID)
            .then(() => {
                navigate(`/character/notes/${char.charID}`);
            })
            .catch(err => {
                console.log('err',err)
            })
    }
    const newNote = () => {
        const noteItem: NoteItem = {
            id:0,
            itemDetails: noteText,
            itemOrder: note.notes.length + 1,
            noteID: note.noteID
        }
        sendNewNoteDetail(noteItem, char.charID)
            .then(nte => {
                const newNote: Note = {
                    ...note,
                    notes: [...nte]
                }
                setNote(newNote);
                setNoteText('');
                setIsAdding(false);
            })
            .catch(err => console.log(err))
    }
    useEffect(()=>{
        setNote(note)
    },[note]);
    return (
        <>
                <Grid container className='standardList'>
                    <Grid container item justifyContent="center">
                        <p><Link className='nonDecLink' to={`/character/notes/${char.charID}`}>{char?.charName}</Link> - Note</p>
                    </Grid>
                </Grid>
                <FilterBar value={listFilter} setValue={setListFilter}/>

                <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className='standardList'>
                <Grid item  className='standardRow'>{note.noteTitle}</Grid>
                <Grid className='standardRow' direction='column'>
                    {note.notes.map((item) => {
                        if(item.itemDetails.toLocaleLowerCase().includes(listFilter.toLocaleLowerCase())){
                            return (<SingleLineEdit 
                                item = {item} 
                                onChange={updateOneNoteLine}
                                onDelete={deleteNote}
                            />)

                        }
                        })
                    }
                </Grid>
                {!isAdding &&
                    <Grid container direction="row" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList" columnGap={3}>
                        <Button style={{width:'fit-content'}} variant="contained" onClick={()=>{navigate(`/character/notes/${char.charID}`)}}>Cancel</Button>
                        <Button style={{width:'fit-content'}} variant="contained" onClick={()=>saveNotes()}>Save</Button>
                        <Button style={{width:'fit-content'}} variant="contained" onClick={()=>setIsAdding(true)}>New</Button>
                    </Grid>
                }
                {isAdding &&
                <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
                    <Grid item justifyContent={"center"} style={{fontSize:'18px'}} className="standardRow">
                        <TextField
                            style={{display:'flex', flexGrow:'1',}} 
                            value={noteText}
                            onChange={ (evt)=> setNoteText(evt.target.value) }
                            placeholder='Note'
                            multiline
                        />
                    </Grid>
                    <Grid container direction="row" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList" columnGap={3}>
                        <Button style={{width:'fit-content', margin:'12px 0'}} variant="contained" onClick={()=>{ setNoteText('');setIsAdding(false)}}>Cancel</Button>
                        <Button style={{width:'fit-content', margin:'12px 0'}} variant="contained" onClick={()=>newNote()}>Save</Button>
                    </Grid>
                </Grid>
                }
            </Grid>
        </>
    )
}