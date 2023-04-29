import { Button, Grid, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Character } from "../../interfaces/character";
import { StatsBar } from "../stats-bar/stats-bar";
import { SavesBar } from "../saves-bar/saves-bar";
import { SkillsBar } from "../skills-bar/skills-bar";
import { InitBar } from "../init-bar/init-bar";
import { loadChar } from "./business-logic/load-chars";
import { showError } from "../modal/business-logic/error-handler";
import { store } from "../../redux/configure-store";
import { CharacterActions } from "../../redux/reducers/character-reducer";
import { batch } from "react-redux";
import { StatsActions } from "../../redux/reducers/stats-reducer";
import { Stat } from "../../interfaces/stat";
import { SavesActions } from "../../redux/reducers/saves-reducer";
import { SavingThrow } from "../../interfaces/saving-throw";
import { SkillActions } from "../../redux/reducers/skills.reducer";
import { Skill } from "../../interfaces/skills";
import { CharLevelActions } from "../../redux/reducers/level-reducer";
import { CharLevel } from "../../interfaces/levels";
import { RawSkill } from "../../interfaces/raw-skill";

const CharacterGetter: React.FunctionComponent = (): JSX.Element => {
  const [char, setChar] = useState<Character | undefined>(undefined);
  const [charId, setCharId] = useState("");

  const requestChar = async (id: string) => {
    if(id==='') {
      return
    }
    await loadChar(id)
      .then( (charData: Character | undefined) => {
        setChar(charData);
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

  const cb =  () => {
    const pathParts = window.location.pathname.split('/');
    const queryParam = pathParts[pathParts.length-1]
    setCharId(queryParam);
    requestChar(charId)
  }
  useEffect( cb, [charId])
  return (
    <>
      <Grid container>
        <Grid container item justifyContent='center'>
            {char?.charName}
        </Grid>
      </Grid>
      {char?.stats && <StatsBar stats={char.stats} />}
      <Grid container direction="row" justifyContent={"center"} gap={2} style={{fontSize:'18px'}}>
        {char?.saves && <SavesBar saves={char.saves} />}
        {char && <InitBar init={char.init ?? 0} />}
        {char?.skills && <SkillsBar skills={char.skills} />}
      </Grid>
      <Grid container item direction="column" justifyContent={"flex-start"} gap={2} 
        style={{fontSize:'18px', overflowY:'auto', flexWrap:'nowrap', flexGrow: '1'}}>
        <p>{char?.charID}</p>
        <p>{char?.charName}</p>
        <p>{char?.race}</p>
        <p>{char?.alignment}</p>
        <p>{char?.charHP}</p>
        <p>{char?.init}</p>
        <p>{char?.image}</p>
        <p>{char?.isDead.toString()}</p>
      </Grid>
    </>
  );
};

export default CharacterGetter;
