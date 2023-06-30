import React, {useState, useEffect} from 'react';
import { checkPerm } from '../components/redirect';
import { useNavigate } from 'react-router-dom';
import { showError } from '../components/modal/business-logic/error-handler';

export const CharMain : React.FunctionComponent = (props): JSX.Element =>{
    const navigate = useNavigate();
    useEffect(()=> {
        try{
            checkPerm();
        }catch(err){
            showError('not_logged_in');
            navigate(`/`);
        }
    });
    return (
        <>
            <div> Main char holder</div>
        </>
    )
}