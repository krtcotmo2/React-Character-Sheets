import React from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/configure-store";
import { SavingThrow } from "../../interfaces/saving-throw";
import { CollapsibleRow } from "../../components/collapsible-row/collapsible-row";
import { Grid } from "@mui/material";
import { Character } from "../../interfaces/character";

export const CharacterSaves: React.FC = (): JSX.Element => {
  const charSave: SavingThrow = useSelector((state) => store.getState().saves);
  const char: Character = useSelector((state) => store.getState().character);

  return (
    <>
      <Grid container>
        <Grid container item justifyContent="center">
          <p>{char?.charName} - Saves</p>
        </Grid>
      </Grid>
      <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
        <Grid item className="standardRow">
          <CollapsibleRow title="Fortitude" value={charSave.fortitude.value} breakdown={charSave.fortitude.breakdown}/>
        </Grid>
        <Grid item className="standardRow">
            <CollapsibleRow title="Reflex" value={charSave.reflex.value} breakdown={charSave.reflex.breakdown} />
        </Grid>
        <Grid item className="standardRow">
            <CollapsibleRow title="Will" value={charSave.will.value} breakdown={charSave.will.breakdown} />
        </Grid>
      
      </Grid>
    </>
  );
};
