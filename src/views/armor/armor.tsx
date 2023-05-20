import React, { useEffect, useState } from 'react';
import { Skill, RawSkill } from '../../interfaces/skills';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { CollapsibleRow } from '../../components/collapsible-row/collapsible-row';
import { Character } from '../../interfaces/character';
import { Grid } from '@mui/material';
import { ArmorSet } from '../../interfaces/armor';
import { getCharacterArmor } from '../../api/armor-api';
import { Modifier } from 'typescript';
// import { getCharacterArmor } from './business-logic/armor-helper';

interface ArmorProps {
    skills?: Skill[];
}


export const CharacterArmor:React.FC<ArmorProps> = (props: ArmorProps): JSX.Element => {
    
    const [armors, setArmors] = useState<ArmorSet[]>([]);
    const char: Character = useSelector(state => store.getState().character);

    useEffect( () => {
        console.log(char)
        getCharacterArmor(store.getState().character.charID.toString())
            .then(armors => {
                // store.dispatch(SpellActions.setSpells(armors));
                setArmors(armors, );
            })
    }, []);
    return (   
        <>
            <Grid container>
                <Grid container item justifyContent="center">
                <p>{char?.charName} - Armor</p>
                </Grid>
            </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
            {
                armors.map(armor => (
                    <Grid item className="standardRow">
                        <CollapsibleRow 
                            title={armor.name} 
                            breakdown={[]} 
                            value={armor.score}
                            //skillData='';
                        />
                    </Grid>
                ))
            }
            </Grid>
        </>     
    )
}