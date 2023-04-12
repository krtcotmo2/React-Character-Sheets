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
    if (searchParam === "5") {
      setChar({
        charID: 15,
        userId: 1,
        charName: "Wahid Mashae",
        charHP: 48,
        race: "Elf",
        alignment: "Neutral Good",
        init: 7,
        isDead: false,
        image: "wahid.png",
        stats: {
          str: {
            value: 15,
            breakdown: [
              { id: 271, score: 15, type: ModifierType.BASE, modDesc: "Base" },
            ],
          },
          dex: {
            value: 19,
            breakdown: [
              { id: 272, score: 17, type: ModifierType.BASE, modDesc: "Base" },
              { id: 273, score: 2, type: ModifierType.MODIFIER, modDesc: "Elf" },
            ],
          },
          con: {
            value: 16,
            breakdown: [
              { id: 274, score: 18, type: ModifierType.BASE, modDesc: "Base" },
              { id: 275, score: -2, type: ModifierType.MODIFIER, modDesc: "Elf" },
            ],
          },
          int: {
            value: 19,
            breakdown: [
              { id: 236, score: 14, type: ModifierType.BASE, modDesc: "Base" },
              { id: 237, score: 2, type: ModifierType.MODIFIER, modDesc: "Elf" },
              {
                id: 276,
                score: 2,
                type: ModifierType.MODIFIER,
                modDesc: "Additional Bonus",
              },
              { id: 290, score: 1, type: ModifierType.MODIFIER, modDesc: "4th level" },
            ],
          },
          wis: {
            value: 13,
            breakdown: [{ id: 239, score: 13, type: ModifierType.BASE, modDesc: "" }],
          },
          chr: {
            value: 11,
            breakdown: [
              { id: 238, score: 13, type: ModifierType.BASE, modDesc: "" },
              {
                id: 286,
                score: -2,
                type: ModifierType.MODIFIER,
                modDesc: "Curses side effect",
              },
            ],
          },
        },
        saves: {
          fortitude: {
            value: 8,
            breakdown: [
              { id: 81, score: 4, type: ModifierType.BASE, modDesc: "" },
              { id: 87, score: 3, type: ModifierType.MODIFIER, modDesc: "Con" },
              {
                id: 94,
                score: 1,
                type: ModifierType.MODIFIER,
                modDesc: "Ring of Resistance",
              },
            ],
          },
          reflex: {
            value: 4,
            breakdown: [
              { id: 82, score: 1, type: ModifierType.BASE, modDesc: "Base" },
              { id: 84, score: 4, type: ModifierType.MODIFIER, modDesc: "Dex" },
              { id: 85, score: -2, type: ModifierType.MODIFIER, modDesc: "Armor check" },
              {
                id: 95,
                score: 1,
                type: ModifierType.MODIFIER,
                modDesc: "Ring of Resistance",
              },
            ],
          },
          will: {
            value: 6,
            breakdown: [
              { id: 83, score: 4, type: ModifierType.BASE, modDesc: "" },
              { id: 86, score: 1, type: ModifierType.MODIFIER, modDesc: "Wis" },
              {
                id: 96,
                score: 1,
                type: ModifierType.MODIFIER,
                modDesc: "Ring of Resistance",
              },
            ],
          },
        },
        skills:[],
      });
      setCharId("");
      return;
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
