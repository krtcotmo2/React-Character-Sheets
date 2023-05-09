import { Divider, Drawer } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import './side-drawer.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Character } from '../../interfaces/character';
import { store } from '../../redux/configure-store';



export interface DrawerProp{
    drawerStatus: boolean;
    setDrawerStatus: Dispatch<SetStateAction<boolean>> ;
}
export const SideDrawer: React.FunctionComponent<DrawerProp> = (props: DrawerProp): JSX.Element =>{
    const {drawerStatus, setDrawerStatus} = props;
    const char: Character = useSelector(state => store.getState().character);
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
                <Link className='pageLink' onClick={toggleDrawer(false)} to="/main/loadChar">Load Character</Link>
                <Divider/>
                <p className='shelfHeader'>Current Character</p>
                <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/${char.charID}`}>Overview</Link>
                <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/${char.charID}`}>View/Edit Core Details</Link>
                <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/stats/${char.charID}`}>View/Edit Stats Details</Link>
                <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/save/${char.charID}`}>View/Edit Saves Details</Link>
                <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/acs/${char.charID}`}>View/Edit Armor Class Details</Link>
                <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/tohits/${char.charID}`}>View/Edit To Hits Details</Link>
                <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/feats/${char.charID}`}>View/Edit Feats Details</Link>
                <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/skills/${char.charID}`}>View/Edit Skills Details</Link>
                {char.isCaster && (
                    <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/spells/${char.charID}`}>View/Edit Spells Details</Link>
                )}
                <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/expendables/${char.charID}`}>View/Edit Expendables Details</Link>
                <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/notes/${char.charID}`}>View/Edit Notes Details</Link>
                <Divider/>
                <p className='shelfHeader'>User Status</p>
                <Link className='pageLink' onClick={toggleDrawer(false)} to={`/`} style={{marginBottom: '24px'}}>Logout</Link>
            </Drawer>
        </div>
    )
} 