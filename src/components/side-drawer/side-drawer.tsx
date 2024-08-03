import { Divider, Drawer } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import './side-drawer.css';
import { Link } from 'react-router-dom';
import { useSelector, batch } from 'react-redux';
import { Character } from '../../interfaces/character';
import { store } from '../../redux/configure-store';
import { ToHitActions } from '../../redux/reducers/to-hit-reducer';
import { CharacterActions } from '../../redux/reducers/character-reducer';
import { StatsActions } from '../../redux/reducers/stats-reducer';
import { SavesActions } from '../../redux/reducers/saves-reducer';
import { SkillActions } from '../../redux/reducers/skills.reducer';
import { UserActions } from '../../redux/reducers/user-reducer';
import { ArmorActions } from '../../redux/reducers/armor-reducer';
import { setCookie } from 'react-use-cookie';



export interface DrawerProp{
    drawerStatus: boolean;
    setDrawerStatus: Dispatch<SetStateAction<boolean>> ;
}
export const SideDrawer: React.FunctionComponent<DrawerProp> = (props: DrawerProp): JSX.Element =>{
    const {drawerStatus, setDrawerStatus} = props;
    const char: Character = useSelector(state => store.getState().character);
    const userId = useSelector( state => store.getState().user.id);
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
    const logOut = () => {
        batch( () => {
            store.dispatch(StatsActions.clearStats());
            store.dispatch(SavesActions.clearSaves());
            store.dispatch(SkillActions.clearSkills());
            store.dispatch(CharacterActions.clearCharacter());
            store.dispatch(ArmorActions.clearArmor());
            store.dispatch(ToHitActions.clearToHits());
            store.dispatch(UserActions.clearUser());
        });
        setCookie('token', '',{days:-1});
        setDrawerStatus(false);
    }
    return (
        <div>
            <Drawer anchor="left" open={drawerStatus} onClose={toggleDrawer(false)}>
                {userId !== '' && (<>
                    <p className='shelfHeader'>Characters</p>
                    <Link className='pageLink' onClick={toggleDrawer(false)} to="/main/loadChar">Load Characters</Link>
                    <Link className='pageLink' onClick={toggleDrawer(false)} to="/main/newChar">Create Character</Link>
                    <Divider/>
                    <p className='shelfHeader'>Current Character</p>
                    <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/overview/${char.charID}`}>Overview</Link>
                    <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/${char.charID}`}>View/Edit Core Details</Link>
                    <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/stats/${char.charID}`}>View/Edit Stats Details</Link>
                    <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/save/${char.charID}`}>View/Edit Saves Details</Link>
                    <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/acs/${char.charID}`}>View/Edit Armor Class Details</Link>
                    <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/tohits/${char.charID}`}>View/Edit To Hits Details</Link>
                    <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/feats/${char.charID}`}>View/Edit Feats Details</Link>
                    <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/skills/${char.charID}`}>View/Edit Skills Details</Link>
                    {char.isCaster && (
                        <>
                            <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/spells/${char.charID}`}>View/Edit Spells Details</Link>
                        </>
                    )}
                    <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/expendables/${char.charID}`}>View/Edit Expendables Details</Link>
                    <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/equipment/${char.charID}`}>View/Edit Equipment Details</Link>
                    <Link className='pageLink' onClick={toggleDrawer(false)} to={`/character/notes/${char.charID}`}>View/Edit Notes Details</Link>
                    <Divider/>
                </>)}
                {
                    userId === '' && (
                        <>
                            <p className='shelfHeader'>Characters</p>
                            <Link className='pageLink' onClick={toggleDrawer(false)} to="/main/loadChar">Load Characters as Guest</Link>
                        </>
                    )
                }
                <p className='shelfHeader'>User Status</p>
                <Link className='pageLink'  onClick={toggleDrawer(false)} to={`/`}>Home</Link>
                {userId !== '' && (<Link className='pageLink' onClick={logOut} to={`/`} style={{marginBottom: '24px'}}>Logout</Link>)}
            </Drawer>
        </div>
    )
} 