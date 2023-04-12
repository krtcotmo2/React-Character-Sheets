import React from 'react';
import { Grid } from '@mui/material';
import {uniqBy} from 'lodash';

import { Skill } from '../../interfaces/skills';

export const SkillsBar: React.FC<SkillProps> = (props: SkillProps):JSX.Element => {
  const {skills} = props  
  const pinnedSkills = skills.filter(skill => skill.pinned);
  const namedSkill = uniqBy(pinnedSkills, 'skillID');
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
    skills: Skill[];
}