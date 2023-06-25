import React from 'react';
import { Grid } from '@mui/material';
import {uniqBy} from 'lodash';

import { RawSkill } from '../../interfaces/skills';
import { Character } from '../../interfaces/character';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { Link } from 'react-router-dom';

export const SkillsBar: React.FC<SkillProps> = (props: SkillProps):JSX.Element => {
  const {skills} = props  
  const pinnedSkills = skills.filter(skill => skill.pinned);
  const namedSkill = uniqBy(pinnedSkills, 'skillID');
  const char: Character = useSelector(state => store.getState().character);
  const finalPinned = namedSkill.map(nSkill => {
    return {
      skillName: nSkill.skillName,
      value: pinnedSkills
        .filter(skill => skill.skillID === nSkill.skillID)
        .reduce( (origin, skill) => origin + skill.score, 0),
    }
  });
  return (
      <>
        <Grid item>
          <Link style={{display:'block', margin:'18px 0'}} to={`/character/skills/${char.charID}`}>Skills</Link>
        </Grid>
        { 
          finalPinned.map( skill => {
            return (
              <Grid item>
              <p>{skill.skillName}: {skill.value}</p>
            </Grid>
            )
          })
        }
        
      </>
    );
}

interface SkillProps{
    skills: RawSkill[];
}