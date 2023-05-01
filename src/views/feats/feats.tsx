import React, {useEffect, useState} from 'react';
import { Feat } from '../../interfaces/feats';
import { getCharacterFeats } from '../../api/feats-api';
import { store } from '../../redux/configure-store';
import { FeatsActions } from '../../redux/reducers/feates-reducer';

export const CharacterFeats: React.FC = (): JSX.Element => {
    const [feats, setFeats] = useState<Feat[]>([]);
    useEffect( () => {
        getCharacterFeats(store.getState().character.charID.toString())
        .then( currentFeats => {
            setFeats(currentFeats);
            store.dispatch(FeatsActions.setCharFeats(currentFeats));
        })
    },[])

    return(
        <>
        {feats.map(feat => {
            return (<p>{feat.desc.name}</p>)
        })}
        </>
    )
}