import React, {useEffect, useState} from 'react';
import { store } from '../../redux/configure-store';
import { Login } from '../../components/login/login';
import { useSelector } from 'react-redux';
import { checkStatus } from '../../api/user-api';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/user';
import { UserActions } from '../../redux/reducers/user-reducer';
import { getCookie } from 'react-use-cookie';

export const LandingPage: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const user = useSelector( state => store.getState().user);
    
    useEffect(()=>{
        const token = getCookie('token');
        if(user.id ==='' && token !== '' && token !== undefined){
            checkStatus().then(arg=>{
                const mappedUser: User = {
                    name: arg.userName,
                    email: arg.userEmail,
                    id: arg.userID.toString(),
                    authenticated: true,
                    forcedReset: arg.forcedReset
                }
                store.dispatch(UserActions.setUser(mappedUser));
                navigate('/main/loadChar');
            }).catch(()=>{});
        }else if(user.id !=='' && token !== '' && token !== undefined){
            navigate('/main/loadChar');
        } 
    })
    return (
        <>
            {(user.id === '' || user.forcedReset || getCookie('token') === '') && <Login/>}
        </>
    )

}