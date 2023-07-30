import React, {useEffect, useState} from 'react';
import { Feat } from '../../interfaces/feats';
import { getCharacterFeats } from '../../api/feats-api';
import { store } from '../../redux/configure-store';
import { FeatsActions } from '../../redux/reducers/feates-reducer';
import { useSelector } from 'react-redux';
import { Character } from '../../interfaces/character';
import { Button, Divider, Grid } from '@mui/material';
import { CollapsibleRow } from '../../components/collapsible-row/collapsible-row';
import { Link } from 'react-router-dom';
import { NewFeat } from '../../components/new-feat/new-feat';

export const CharacterFeats: React.FC = (): JSX.Element => {
    const [feats, setFeats] = useState<Feat[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const char: Character = useSelector((state) => store.getState().character);

    useEffect( () => {
        getCharacterFeats(store.getState().character.charID.toString())
        .then( currentFeats => {
            setFeats(currentFeats);
            store.dispatch(FeatsActions.setCharFeats(currentFeats));
        })
    },[])

    const toggleIsAdding = (val: boolean) => {
        setIsAdding(val ||!isAdding);
    }
    return(
        <>
        <Grid container>
            <Grid container item justifyContent="center">
            <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Feats</p>
            </Grid>
        </Grid>
        <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
            {feats.map((feat, i) => {
                return (
                    <Grid item className="standardRow">
                        <CollapsibleRow key={i} title={feat.desc.name} desc={feat.desc} breakdown={[]} allowEditing={false}/>
                
                    
                    </Grid>
                )
            })}
            
            <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
            
            { !isAdding && 
                <Button style={{width:'fit-content'}} variant="contained" onClick={ () => toggleIsAdding(true) } >Add New Feat</Button> 
            }
            { isAdding &&  <NewFeat cancel={toggleIsAdding}></NewFeat> }
        </Grid>
        </>
    )
}