import { Divider, Drawer } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import './side-drawer.css';
import { Link } from 'react-router-dom';



export interface DrawerProp{
    drawerStatus: boolean;
    setDrawerStatus: Dispatch<SetStateAction<boolean>> ;
}
export const SideDrawer: React.FunctionComponent<DrawerProp> = (props: DrawerProp): JSX.Element =>{
    const {drawerStatus, setDrawerStatus} = props;
   
    const toggleDrawer = (status: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
        ) {
        return;
        }
        setDrawerStatus(status);
    };

    return (
        <div>
            <Drawer anchor="left" open={drawerStatus} onClose={toggleDrawer(false)}>
                <p className='shelfHeader'>Characters</p>
                <div className='pageLink' onClick={toggleDrawer(false)}>
                    <Link to="/main/loadChar">Load Character</Link>
                </div>
                <Divider/>
                <p className='shelfHeader'>Current Character</p>
                <div className='pageLink' onClick={toggleDrawer(false)}>
                    <Link to="/">View/Edit Core Details</Link>
                </div>
                <div className='pageLink' onClick={toggleDrawer(false)}>
                    <Link to='/character/stats'>View/Edit Stats Details</Link>
                </div>
                <div className='pageLink' onClick={toggleDrawer(false)}>View/Edit Saves Details</div>
                <div className='pageLink' onClick={toggleDrawer(false)}>View/Edit Skills Details</div>
                <div className='pageLink' onClick={toggleDrawer(false)}>View/Edit Spells Details</div>
                <div className='pageLink' onClick={toggleDrawer(false)}>View/Edit Expendables Details</div>
                <div className='pageLink' onClick={toggleDrawer(false)}>View/Edit Notes Details</div>
                <Divider/>
                <p className='shelfHeader'>User Status</p>
                <div className='pageLink' onClick={toggleDrawer(false)}>Log Out</div>
            </Drawer>
        </div>
    )
} 