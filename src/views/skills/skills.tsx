import React, { useEffect, useState } from 'react';
import { Skill, RawSkill } from '../../interfaces/skills';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { formatSkills } from './business-logic/skill-formatter';
import { CollapsibleRow } from '../../components/collapsible-row/collapsible-row';
import { Character } from '../../interfaces/character';
import { Button, Divider, Grid } from '@mui/material';
import { getAllSkills } from '../../api/skills-api';
import { SkillActions } from '../../redux/reducers/skills.reducer';
import { Link } from 'react-router-dom';
import { WHATISMOD } from '../../enum/what-is-mod-type';

interface SkillsProps {
    skills?: Skill[];
}


export const CharacterSkills:React.FC<SkillsProps> = (props: SkillsProps): JSX.Element => {
    
    const curSkills: RawSkill[] = useSelector(state => store.getState().skills);
    const [grpdSkills, setGrpdSkills ] = useState<Skill[]>([]);
    const char: Character = useSelector(state => store.getState().character);

    useEffect(() => {
        getAllSkills(char.charID.toString()).then(skills => {
            setGrpdSkills(formatSkills(skills)); 
            store.dispatch(SkillActions.setSkills(skills as RawSkill[]));
        }) 
    }, []);

    useEffect(()=>{
        const a = formatSkills(curSkills);
        setGrpdSkills(a);
    }, [curSkills]);
    return (
        
        <>
            <Grid container>
                <Grid container item justifyContent="center">
                <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Skills</p>
                </Grid>
            </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
                {
                    grpdSkills.map(skl => (
                        <Grid item className="standardRow" key={skl.skillID}>
                            <CollapsibleRow 
                                title={skl.skillName} 
                                breakdown={skl.breakdown} 
                                value={skl.value}
                                skillData={skl}
                                characteristic={WHATISMOD.SKILL}
                            />
                        </Grid>
                    ))
                }
                
                <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
                <Button style={{width:'fit-content'}} variant="contained">Add New Skill</Button>
            </Grid>
        </>     
    )
}