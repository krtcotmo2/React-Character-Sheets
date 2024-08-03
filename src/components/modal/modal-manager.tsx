import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal } from '../../interfaces/modal';

let allModals:Modal[] = [];
let setAllModals: Dispatch<SetStateAction<Modal[]>>;

export const pushModal = (component: JSX.Element, modalId: string) => {
  const newModal:Modal = {
      component: component,
      id: modalId,
      zIndex: (allModals.at(0)?.zIndex ?? 0) + 1,

  };
  const existingModal = allModals.find(modal => modal.id === newModal.id);
  if(existingModal){
    return;
  }
  
  allModals = [newModal, ...allModals];
  setAllModals([...allModals])
}

export const popModal = (modalId:string) => {
  const aModal = allModals.find(modal => modal.id === modalId);
  if(!aModal){
    allModals = allModals.slice(0, -1);
  }else{
    allModals = allModals.filter(modal => modal.id !== modalId);
  }
  setAllModals([...allModals])
}

export const MessageManager = () :JSX.Element=>  {
    let [modals, setModals] = useState<Modal[]>([]);
    setAllModals = setModals;

    useEffect(()=> {
        modals = [...modals];
      },[modals]);
      
    return (
        <>
            <div className='message' style={{display:'flex', justifyContent:'flex-start'}}>
                {
                modals.map( (modal, i) => {
                    return (
                    <div key={i} id={modal.id}>
                    {modal.component}
                    </div>
                )})
                }
         </div>
        </>
    );
}