import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Character } from "../../interfaces/character";
import { StatsBar } from "../stats-bar/stats-bar";
import { SavesBar } from "../saves-bar/saves-bar";
import { ModifierType } from "../../enum/modifier-type";
import { SkillsBar } from "../skills-bar/skills-bar";
import { InitBar } from "../init-bar/init-bar";

const CharacterGetter: React.FunctionComponent = (): JSX.Element => {
  const [char, setChar] = useState<Character | undefined>(undefined);
  const [charId, setCharId] = useState("");

  
  const getChar = async () => {
    const searchParam = charId;
    if(charId .trim() === '' || +charId < 1){
      alert('enter in a valid id')
    }
   
    const achar = await axios
      .get(
        `http://localhost:3001/api/character/with-stats/${searchParam}`
      )
      .catch((err) => {
        setChar(undefined);
      });
    setCharId("");
    if (!achar) {
      alert(`character with id ${searchParam} not found`);
      return;
    }
    setChar(achar.data);
  };

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
            <Button onClick={getChar}>Go</Button>
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
