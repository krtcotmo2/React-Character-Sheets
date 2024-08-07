import { Grid } from "@mui/material";
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Character } from "../../interfaces/character";
import { StatsBar } from "../stats-bar/stats-bar";
import { SavesBar } from "../saves-bar/saves-bar";
import { SkillsBar } from "../skills-bar/skills-bar";
import { InitBar } from "../init-bar/init-bar";
import { checkForCaster, loadChar } from "./business-logic/load-chars";
import { showError } from "../modal/business-logic/error-handler";
import { store } from "../../redux/configure-store";
import { CharacterActions } from "../../redux/reducers/character-reducer";
import { batch, useSelector } from "react-redux";
import { StatsActions } from "../../redux/reducers/stats-reducer";
import { Stat } from "../../interfaces/stat";
import { SavesActions } from "../../redux/reducers/saves-reducer";
import { SavingThrow } from "../../interfaces/saving-throw";
import { SkillActions } from "../../redux/reducers/skills.reducer";
import { RawSkill } from "../../interfaces/skills";
import { CharLevelActions } from "../../redux/reducers/level-reducer";
import { CharLevel } from "../../interfaces/levels";
import { ToHitGroup } from "../../interfaces/to-hit";
import { HitsBar } from "../hits-bar/hits-bar";
import { ToHitActions } from "../../redux/reducers/to-hit-reducer";
import { addStatsToArmor } from "../../views/armor/business-logic/armor-helper";
import { ArmorActions } from "../../redux/reducers/armor-reducer";
import { ArmorSet } from "../../interfaces/armor";
import { ArmorBar } from "../armor-bar/armor-bar";

const CharacterOverview: React.FunctionComponent = (): JSX.Element => {
  const char = useSelector(state => store.getState().character);
  const skills = useSelector(state => store.getState().skills);
  const saves = useSelector(state => store.getState().saves);
  const stats = useSelector(state => store.getState().stats);
  const armors = useSelector(state => store.getState().armor);
  const [charId, setCharId] = useState("");;
  const toHits: ToHitGroup[] = useSelector(state => store.getState().toHitGroups);
  

  const cb =  () => {
    const requestChar = async (id: string) => {
      if(id==='') {
        return
      }
      await loadChar(id)
        .then( (charData: Character | undefined) => {
          if(charData){
            charData.isCaster = checkForCaster(charData?.levels);
          }
          addStatsToArmor(charData?.armors ?? [], charData?.stats?.dex.value ?? 0)
          batch(()=>{
            store.dispatch(CharacterActions.setCharacter(charData as Character));
            store.dispatch(StatsActions.setStat(charData?.stats as Stat));
            store.dispatch(SavesActions.setSaves(charData?.saves as SavingThrow));
            store.dispatch(SkillActions.setSkills(charData?.skills as RawSkill[]));
            store.dispatch(CharLevelActions.setCharLevels(charData?.levels as CharLevel[]));
            store.dispatch(ToHitActions.setToHitGroups(charData?.toHitGroups as ToHitGroup[]));
            store.dispatch(ArmorActions.setArmorGroups(charData?.armors as ArmorSet[]));
          });
        })
        .catch(err => {
          switch(err.message){
            case 'invalid_id':
              showError(err.message);
              break;
            case 'char_not_found':
              showError(
                err.message,
                [{key: 'userId', value: charId}]
              );
            break;
          case 'stat_not_found':
            showError(
              err.message,
              [{key: 'userId', value: charId}]
            );
            break;
          default:
            showError('unknown-error');
        }  
        })
        .finally(()=>{
          //setCharId('');
        })
    }
    const pathParts = window.location.pathname.split('/');
    const queryParam = pathParts[pathParts.length-1]
    setCharId(queryParam);
    requestChar(charId);
  }
  useEffect( cb, [charId]);

  return (
    <>
      <Grid container>
        <Grid container item justifyContent='center'>
            <p>{char?.charName} {char.charName && `-`} Overview 
              <Link className='topLink' to={`/character/spells/${char.charID}`} title="Spells"><img className='topLineIcons' src='/images/clean.svg'/></Link>
              <Link className='topLink' to={`/character/expendables/${char.charID}`} title="Expendables"><img className='topLineIcons' src='/images/testing-tube.svg'/></Link>
              <Link className='topLink' to={`/character/notes/${char.charID}`} title="Notes"><img className='topLineIcons' src='/images/ancient-scroll.svg'/></Link> 
            </p>
        </Grid>
      </Grid>
      {
        stats && <StatsBar stats={stats} />
      }
      {
      saves &&
        (<Grid container direction="row" justifyContent={"center"} gap={2} style={{fontSize:'18px'}}>
          <SavesBar saves={saves} />
          <InitBar init={char.init ?? 0} />
        </Grid>)
      }
      {
        armors.filter(armor => armor.pinned).length > 0 && armors.length > 0 &&
        <Grid container direction="column" justifyContent={"center"} gap={1} style={{fontSize:'18px', marginTop: '33px'}}>
          {armors && <ArmorBar armors={armors} />}
        </Grid>
      }
      {
        toHits.filter(grp => grp.pinned)?.length > 0 &&
        <Grid container direction="column" justifyContent={"center"} gap={1} style={{fontSize:'18px', marginTop: '33px'}}>
          {toHits && <HitsBar hits={toHits} />}
        </Grid>
      }
      {
        skills && skills.length > 0 &&
        <Grid container direction="column" justifyContent={"center"} gap={1} style={{fontSize:'18px', marginTop: '33px'}}>
          {skills && <SkillsBar skills={skills} />}
        </Grid>
      }
    </>
  );
};

export default CharacterOverview;
