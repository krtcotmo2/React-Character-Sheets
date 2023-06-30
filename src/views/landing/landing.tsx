import React, {useEffect, useState} from 'react';
import { store } from '../../redux/configure-store';
import { Login } from '../../components/login/login';
import { useSelector } from 'react-redux';

export const LandingPage: React.FC = (): JSX.Element => {
    const userId = useSelector( state => store.getState().user.id);
    
    return (
        <>
            {userId === '' && <Login/>}
        </>
    )

}