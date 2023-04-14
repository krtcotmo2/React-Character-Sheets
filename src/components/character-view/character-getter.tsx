import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { Character } from "../../interfaces/character";
import { StatsBar } from "../stats-bar/stats-bar";
import { SavesBar } from "../saves-bar/saves-bar";
import { SkillsBar } from "../skills-bar/skills-bar";
import { InitBar } from "../init-bar/init-bar";
import { getChar } from "./business-logic/load-chars";
import { showError } from "../modal/business-logic/error-handler";

const CharacterGetter: React.FunctionComponent = (): JSX.Element => {
  const [char, setChar] = useState<Character | undefined>(undefined);
  const [charId, setCharId] = useState("");

  const requestChar = async () => {
    await getChar(charId)
      .then( (charData: Character | undefined) => {
        setChar(charData);
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
          default:
            showError('unknown-error');
        }  
      })
      .finally(()=>{
        setCharId('');
      })
  }

  return (
    <>
      <Grid container>
        <Grid container item justifyContent='center'>
          <form style={{ color: "white !important" }}>
            Get character
            <TextField
              onChange={(event) => setCharId(event.target.value)}
              value={charId}
              type="number"
              sx={{ input: { color: "black" } }}
            >
              {charId}
            </TextField>
            <Button onClick={requestChar}>Go</Button>
          </form>
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
