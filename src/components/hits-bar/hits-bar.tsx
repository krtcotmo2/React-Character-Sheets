import React from 'react';
import { Grid } from '@mui/material';
import { Character } from '../../interfaces/character';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { Link } from 'react-router-dom';
import { ToHitGroup } from '../../interfaces/to-hit';
import { Stat } from '../../interfaces/stat';
import { CharLevel } from '../../interfaces/levels';

export const HitsBar: React.FC<HitProps> = (props: HitProps):JSX.Element => {
  const {hits} = props  
  const pinnedHits = hits.filter(hits => hits.pinned);
  const char: Character = useSelector(state => store.getState().character);
  const stats: Stat = useSelector(state => store.getState().stats);
  const levels: CharLevel[] = useSelector(state => store.getState().levels);
  const levelTohit = levels.reduce( (orig, lvl) => orig + lvl.toHit, 0);
  return (
      <>
        <Grid item>
          <Link style={{display:'block', margin:'0'}} to={`/character/tohits/${char.charID}`}>Hits</Link>
        </Grid>
        { 
          pinnedHits.map( hit => {
            return (
              <Grid item>
              <p style={{margin:'0'}}>{hit.hitName}: {hit.value + Math.floor((hit.isMelee ? stats.str.value - 10 : stats.dex.value - 10)/2) + levelTohit}</p>
              <p style={{margin:'0', fontSize:'0.75rem'}}>Damage: {hit.damage}</p>
            </Grid>
            )
          })
        }
        
      </>
    );
}

interface HitProps{
    hits: ToHitGroup[];
}

