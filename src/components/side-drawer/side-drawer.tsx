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
                <div className='pageLink' onClick={toggleDrawer(false)}>
                    <Link to="/main/loadChar">Load Character</Link>
                </div>
                <Divider/>
                <p className='shelfHeader'>Current Character</p>
                <div className='pageLink' onClick={toggleDrawer(false)}>
                    <Link to={`/character/${char.charID}`}>View/Edit Core Details</Link>
                </div>
                <div className='pageLink' onClick={toggleDrawer(false)}>
                    <Link to={`/character/stats/${char.charID}`}>View/Edit Stats Details</Link>
                </div>
                <div className='pageLink' onClick={toggleDrawer(false)}>
                    <Link to={`/character/save/${char.charID}`}>View/Edit Saves Details</Link>
                </div>
                <div className='pageLink' onClick={toggleDrawer(false)}>
                    <Link to={`/character/skills/${char.charID}`}>View/Edit To Hits Details</Link>
                </div>
                <div className='pageLink' onClick={toggleDrawer(false)}>
                    <Link to={`/character/skills/${char.charID}`}>View/Edit Feats Details</Link>
                </div>
                <div className='pageLink' onClick={toggleDrawer(false)}>
                    <Link to={`/character/skills/${char.charID}`}>View/Edit Skills Details</Link>
                </div>
                {char.isCaster && (
                    <div className='pageLink' onClick={toggleDrawer(false)}>
                        <Link to={`/spells/character/${char.charID}`}>View/Edit Spells Details</Link>
                    </div>
                )}
                <div className='pageLink' onClick={toggleDrawer(false)}>View/Edit Expendables Details</div>
                <div className='pageLink' onClick={toggleDrawer(false)}>View/Edit Notes Details</div>
                <Divider/>
                <p className='shelfHeader'>User Status</p>
                <div className='pageLink' onClick={toggleDrawer(false)}>Log Out</div>
            </Drawer>
        </div>
    )
} 