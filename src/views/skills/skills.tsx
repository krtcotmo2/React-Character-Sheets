import React, { useEffect, useState } from 'react';
import { Skill, RawSkill } from '../../interfaces/skills';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { formatSkills } from './business-logic/skill-formatter';
import { CollapsibleRow } from '../../components/collapsible-row/collapsible-row';

interface SkillsProps {
    skills?: Skill[];
}


export const CharacterSkills:React.FC<SkillsProps> = (props: SkillsProps): JSX.Element => {
    
    const curSkills: RawSkill[] = useSelector(state => store.getState().skills);
    const [grpdSkills, setGrpdSkills] = useState<Skill[]>([]);
    useEffect(()=>{
        const a = formatSkills(curSkills);
        setGrpdSkills(a);
    }, [curSkills]);
    return (
        <div style={{padding:'72px 24px 0px 24px'}}>
        {
            grpdSkills.map(skl => (
                <CollapsibleRow 
                    title={skl.skillName} 
                    breakdown={skl.breakdown} 
                    value={skl.value}
                    skillData={skl}
                />
            ))
        }
        </div>
    )
}