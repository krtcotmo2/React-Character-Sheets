import React, { useEffect, useState } from 'react';
import { store } from '../../redux/configure-store';
import { Grid } from '@mui/material';
import { Note } from '../../interfaces/note';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export interface NoteTitleProps {
    note: Note,
    onClick: (event: any) => void;
}
export const NoteTitleBar: React.FC<NoteTitleProps> = (props: NoteTitleProps): JSX.Element => {
    const {noteTitle, noteID } = props.note;
    const navigate = useNavigate();
    const charOwner = useSelector(state => store.getState().character.userID.toString());
    const userId = useSelector(state => store.getState().user.id);
    const editNote = (event: any) => {
            console.log('Open up the edit note feature' , noteID)
            navigate(`/note/edit/${noteID}`, {
            replace: true,
            state: {
                note: props.note
            }
        })
    }
    return (
        <Grid container item className="standardRow spellTitleBar padding12 vCen" style={{marginBottom:0}} justifyContent='space-between' onClick={props.onClick}>
            <Grid item columnGap={1}>
                <strong>{noteTitle} </strong>
            </Grid>
            <Grid item >
                <Grid container item>
                    {userId === charOwner  &&  <EditIcon onClick={(event)=> editNote(event)}/>}
                </Grid>
            </Grid>
        </Grid>
    )
}