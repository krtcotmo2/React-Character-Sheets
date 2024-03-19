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
    const [isAdding, setIsAdding] = useState(false);
    const char: Character = useSelector((state) => store.getState().character);
    const feats: Feat[] = useSelector((state) => store.getState().feats);
    const [curFeats, setCurFeats] = useState<Feat[]>([]);
    useEffect( () => {
        getCharacterFeats(store.getState().character.charID.toString())
        .then( currentFeats => {
            store.dispatch(FeatsActions.setCharFeats(currentFeats));
            setCurFeats(currentFeats);
        })
    },[])

    const toggleIsAdding = (val: boolean) => {
        setIsAdding(val ||!isAdding);
    }
    return(
        <>
        <Grid container>
            <Grid container item justifyContent="center">
            <p>
                <Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Feats
                <Link className='topLink' to={`/character/spells/${char.charID}`} title="Spells"><img className='topLineIcons' src='/images/clean.svg'/></Link>
                <Link className='topLink' to={`/character/expendables/${char.charID}`} title="Expendables"><img className='topLineIcons' src='/images/testing-tube.svg'/></Link>
                <Link className='topLink' to={`/character/notes/${char.charID}`} title="Notes"><img className='topLineIcons' src='/images/ancient-scroll.svg'/></Link> 
            </p>
            </Grid>
        </Grid>
        <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
            {curFeats.map((feat, i) => {
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