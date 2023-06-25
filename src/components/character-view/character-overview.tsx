import { Grid } from "@mui/material";
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

const CharacterOverview: React.FunctionComponent = (): JSX.Element => {
  const [char, setChar] = useState<Character | undefined>(undefined);
  const [charId, setCharId] = useState("");
  const toHits: ToHitGroup[] = useSelector(state => store.getState().toHitGroups);
  

  const cb =  () => {
    const requestChar = async (id: string) => {
      if(id==='') {
        return
      }
      await loadChar(id)
        .then( (charData: Character | undefined) => {
          setChar(charData);
          if(charData){
            charData.isCaster = checkForCaster(charData?.levels);
          }
          batch(()=>{
            store.dispatch(CharacterActions.setCharacter(charData as Character));
            store.dispatch(StatsActions.setStat(charData?.stats as Stat));
            store.dispatch(SavesActions.setSaves(charData?.saves as SavingThrow));
            store.dispatch(SkillActions.setSkills(charData?.skills as RawSkill[]));
            store.dispatch(CharLevelActions.setCharLevels(charData?.levels as CharLevel[]));
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
  useEffect( cb, [charId])
  return (
    <>
      <Grid container>
        <Grid container item justifyContent='center'>
            <p>{char?.charName} - Overview</p>
        </Grid>
      </Grid>
      {char?.stats && <StatsBar stats={char.stats} />}
      <Grid container direction="row" justifyContent={"center"} gap={2} style={{fontSize:'18px'}}>
        {char?.saves && <SavesBar saves={char.saves} />}
        {char && <InitBar init={char.init ?? 0} />}
      </Grid>
      <Grid container direction="row" justifyContent={"center"} gap={2} style={{fontSize:'18px'}}>
        {char?.skills && <SkillsBar skills={char.skills} />}
      </Grid>
      <Grid container direction="row" justifyContent={"center"} gap={2} style={{fontSize:'18px'}}>
        {toHits && <HitsBar hits={toHits} />}
      </Grid>
    </>
  );
};

export default CharacterOverview;
