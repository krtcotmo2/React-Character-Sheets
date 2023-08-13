import React, { useEffect, useRef, useState } from 'react';
import { NoteRow } from './note-row';
import { NoteTitleBar } from './note-title-bar';
import { Note, NoteItem } from '../../interfaces/note';


export interface SpellGrpProps {
    grp: Note,
    isAdding: boolean,
    hidden: boolean
}

export const sortNotes = (notes: NoteItem[]) =>{
    return notes.sort( (a, b) => {
        if(a.itemOrder < b.itemOrder){
            return -1;
        }else if(a.itemOrder > b.itemOrder){
            return 1;
        }
        return 0;
    });
}
export const NoteGroup: React.FC<SpellGrpProps> = (props: SpellGrpProps): JSX.Element => {
    const {grp, isAdding} = props;
    const [holder, setHolder] = useState(props.hidden);
    const toggleBar = (event:any) => {
        if(event.target.tagName==='DIV'){
            setHolder(!holder);
        };
     }
    return (
        <div className={`spellGrp${holder ? ' hiddenContents' : ''}`}>
            <NoteTitleBar note={grp} onClick={(event)=> toggleBar(event)}/>
            {
                sortNotes(grp.notes).map(sp => {
                    return (<NoteRow note={sp} isAdding={isAdding}/>)
                } )
            }
        </div>
    )
};