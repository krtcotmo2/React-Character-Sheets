import React, { useEffect, useState } from "react";
import { Feat } from "../../interfaces/feats";
import { getCharacterFeats } from "../../api/feats-api";
import { store } from "../../redux/configure-store";
import { FeatsActions } from "../../redux/reducers/feates-reducer";
import { useSelector } from "react-redux";
import { Character } from "../../interfaces/character";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { CollapsibleRow } from "../../components/collapsible-row/collapsible-row";
import { CharLevel } from "../../interfaces/levels";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { LabelField } from "../../components/char-core/label-field";

export const CharacterCore: React.FC = (): JSX.Element => {
  const char: Character = useSelector((state) => store.getState().character);
  const levels: CharLevel[] = useSelector((state) => store.getState().levels);
  const navigate = useNavigate();
  const userID = store.getState().user.id;

  useEffect(() => {}, []);

  const adjustLevels = () => {
    navigate(`/character/levels/${char.charID}`);
  };

  const adjustCore = (core: string, val: string) => {
    navigate(`/character/core/${char.charID}`, {
      replace: true,
      state: {
        whatIsModified: core,
        currentValue: val,
      },
    });
  };

  return (
    <>
      <Grid container>
        <Grid container item justifyContent="center">
          <p>
            <Link
              className="nonDecLink"
              to={`/character/overview/${char.charID}`}
            >
              {char?.charName}
            </Link>{" "}
            - Core
          </p>
        </Grid>
      </Grid>
      <Grid container
        direction="column"
        justifyContent={"center"}
        style={{ fontSize: "18px" }}
        className="standardList"
      >
        <Grid container item direction={"row"} wrap="nowrap" gap={2}>
          <img
            alt='Character'
            src={`../images/${char.image}`}
            style={{ width: "fit-content", height: "fit-content" }}
          />
          <Grid
            container
            direction={"column"}
            justifyContent={"flex-start"}
            alignContent={"flex-start"}
            rowGap={2}
          >
            <LabelField
              label="Name"
              char={char}
              val={char.charName}
              clickEvt={() => adjustCore("Name", char.charName)}
            />
            <LabelField
              label="Alignment"
              char={char}
              val={char.alignment}
              clickEvt={() => adjustCore("Alignment", char.alignment)}
            />
            <LabelField
              label="Race"
              char={char}
              val={char.race}
              clickEvt={() => adjustCore("Race", char.race)}
            />
            <LabelField
              label="Hit Points"
              char={char}
              val={char.charHP.toString()}
              clickEvt={() => adjustCore("Hit Points", char.charHP.toString())}
            />
            <LabelField
              label="Initiative"
              char={char}
              val={char.init.toString()}
              clickEvt={() => adjustCore("Initiative", char.init.toString())}
            />
            <LabelField
              label="Image"
              char={char}
              val={char.image}
              clickEvt={() => adjustCore("Image", char.image)}
            />
          </Grid>
          <Grid
            container
            direction={"column"}
            justifyContent={"flex-start"}
            alignContent={"flex-start"}
          >
            
            <Grid container item justifyContent='flex-start'>
                Levels{" "}
                {userID === char.userID.toString() && (
                  <EditIcon className="pointer" onClick={adjustLevels} style={{marginLeft: '10px'}}/>
                )}
            </Grid>
            <Grid container item justifyContent='flex-start'>
                {levels.map((lvl) => {
                return (
                    <Grid container item justifyContent='flex-start'>
                        {`${lvl.className} - ${lvl.classLevel}`}
                    </Grid>
                )
                })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
