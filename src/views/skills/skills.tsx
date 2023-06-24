import React, { useEffect, useState } from 'react';
import { Skill, RawSkill } from '../../interfaces/skills';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { formatSkills } from './business-logic/skill-formatter';
import { CollapsibleRow } from '../../components/collapsible-row/collapsible-row';
import { Character } from '../../interfaces/character';
import { Grid } from '@mui/material';

interface SkillsProps {
    skills?: Skill[];
}


export const CharacterSkills:React.FC<SkillsProps> = (props: SkillsProps): JSX.Element => {
    
    const curSkills: RawSkill[] = useSelector(state => store.getState().skills);
    const [grpdSkills, setGrpdSkills] = useState<Skill[]>([]);
    const char: Character = useSelector(state => store.getState().character);

    useEffect(()=>{
        const a = formatSkills(curSkills);
        setGrpdSkills(a);
    }, [curSkills]);
    return (
        
        <>
            <Grid container>
                <Grid container item justifyContent="center">
                <p>{char?.charName} - Skills</p>
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
                        />
                    </Grid>
                ))
            }
            </Grid>
        </>     
    )
}