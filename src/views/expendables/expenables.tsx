import React, { useEffect, useState } from 'react';
import { store } from '../../redux/configure-store';
import { Expendable } from '../../interfaces/expendable';
import { getCharacterExpendables } from '../../api/expenndables-api';
import { ExpendableAction } from '../../redux/reducers/expendables-reducer';

export const ExpendablesView: React.FC = (): JSX.Element => {
    
    const [expendables, setExpendables] = useState<Expendable[]>([]);
    useEffect( () => {
     getCharacterExpendables(store.getState().character.charID.toString())
        .then( curExpendables => {
            setExpendables(curExpendables);
            store.dispatch(ExpendableAction.setExpendable(curExpendables));
        })
    },[])

    return(
        <>
        {expendables.map(expendable => {
            return (<p>{expendable.description} {expendable.qty} {expendable.expType}</p>)
        })}
        </>
    )
}