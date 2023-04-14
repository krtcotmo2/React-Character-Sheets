import React from 'react';
import CloseButton from '../close-button';
import { pushModal, popModal } from '../modal-manager';
import { DialogWindow } from '../dialog-window';

const closeModal = (id: string) => {
    console.log(id)
    popModal(id);
    return;
}

export const launchModal = (msg: string, hdr: string, modalId:string, modalButtons?:JSX.Element[]) => {
    const buttons = [(<CloseButton label='Close' click={()=>closeModal(modalId)}/>)];
    const modal: JSX.Element = (<DialogWindow buttons={buttons} id='wtf' lines={[msg]} header={hdr} message={msg} />)
    pushModal(modal, modalId);
}
