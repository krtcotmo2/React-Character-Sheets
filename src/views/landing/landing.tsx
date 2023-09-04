import React, {useEffect, useState} from 'react';
import { store } from '../../redux/configure-store';
import { Login } from '../../components/login/login';
import { useSelector } from 'react-redux';

export const LandingPage: React.FC = (): JSX.Element => {
    const user = useSelector( state => store.getState().user);
    
    return (
        <>
            {(user.id === '' || user.forcedReset) && <Login/>}
        </>
    )

}