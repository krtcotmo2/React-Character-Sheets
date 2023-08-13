export interface Note {
    noteID: number,
    charID: number,
    noteOrder: number,
    noteTitle: string,
    createdAt: Date;
    updatedAt: Date;
    notes: NoteItem[];
}

export interface NoteItem {
    id: number,
    itemOrder: number,
    itemDetails: string,
}