import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Character } from '../../interfaces/character';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { Link } from 'react-router-dom';
import { ToHitGroup } from '../../interfaces/to-hit';
import { Stat } from '../../interfaces/stat';
import { CharLevel } from '../../interfaces/levels';
import { ArmorSet } from '../../interfaces/armor';

export const ArmorBar: React.FC<ArmorProps> = (props: ArmorProps):JSX.Element => {
  const {armors} = props  
  const pinnedArmors = armors.filter(armor => armor.pinned);
  const char: Character = useSelector(state => store.getState().character);
  const stats: Stat = useSelector(state => store.getState().stats);
  const levels: CharLevel[] = useSelector(state => store.getState().levels);

  const getFlatFoot = (set: ArmorSet) => {
    const score = set.values.reduce( (orig, mod) => orig + (mod.aidsFlatfoot ? mod.score : 0), 0);
    return score;
  }

  const getTouch = (set: ArmorSet) => {
    const score = set.values.reduce( (orig, mod) => orig + (mod.aidsTouchAttach ? mod.score : 0), 0);
    return score;
  }
  return (
      <>
      <Grid container direction='row' justifyContent='center'>
        <Grid item>
          <Link style={{display:'block', margin:'0'}} to={`/character/acs/${char.charID}`}>Armor Sets</Link> 
        </Grid>
        <Grid item style={{display:'flex', alignItems:'center'}}>
          <Typography> (reg/touch/ff)</Typography>
        </Grid>

      </Grid>
        { 
          pinnedArmors.map( armor => {
            return (
              <Grid item>
              <p style={{margin:'0'}}>{armor.name}: {armor.score}/{getTouch(armor)}/{getFlatFoot(armor)}</p>
            </Grid>
            )
          })
        }
        
      </>
    );
}

interface ArmorProps{
    armors: ArmorSet[];
}

