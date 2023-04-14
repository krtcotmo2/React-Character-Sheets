import { Dialog, DialogActions, DialogContent, DialogContentText,  DialogTitle } from '@mui/material';
import React from 'react';

interface DialogProps{
    buttons?: JSX.Element[];
    lines?: string[];
    message?: string;
    header?: string;
    id: string;
}
export const DialogWindow: React.FC<DialogProps> = (props): JSX.Element => {
    const {buttons, lines, message, header} = props;
    return(
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle  id="alert-dialog-title">
          <span style={{ margin: '0px', color: '#333', fontSize: '20px', fontWeight: 'bold',}}>{header}</span>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContent className="modal-content">
            {typeof message === 'string' && lines?.map( line => {
              return ( <DialogContentText id="alert-dialog-description" align='center'>
                {line}
                </DialogContentText>
              )
              }  
            )}
            {typeof message === 'object' && (lines)}
          </DialogContent>
        </DialogContent>
        <DialogActions style={{justifyContent:'center'}}>
          {buttons?.map(btn => btn)}
        </DialogActions>
      </Dialog>
    )
}