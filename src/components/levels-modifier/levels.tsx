import React, { useEffect, useState } from "react";
import { Character } from "../../interfaces/character";
import { useSelector } from "react-redux";
import { store } from "../../redux/configure-store";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { LevelRow } from "./level-row";
import { Link, useNavigate } from "react-router-dom";
import { charClasses, CharClass } from "../../enum/class-types";
import { CharLevel, SaveLevel } from "../../interfaces/levels";
import { saveALevel } from "../../api/level-api";
import { getChar } from "../../api/character-api";
import { CharLevelActions } from "../../redux/reducers/level-reducer";

export const LevelsModified: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  {
    const levels = useSelector((state) => store.getState().levels);
    const char = useSelector((state) => store.getState().character);
    const [newLevel, setNewLevel] = useState("");
    const [newClass, setNewClass] = useState("");
    const [addingStat, setAddingStat] = useState(false);

    const saveLevels = async () => {
      const newLevelAddition: SaveLevel = {
        charID: char.charID,
        id: 0,
        classID: +newClass,
        classLevel: +newLevel,
      };
      await saveALevel(newLevelAddition).then(async (results) => {
        await getChar(char.charID.toString()).then((charData) => {
            store.dispatch(CharLevelActions.setCharLevels(charData?.levels as CharLevel[]));
          navigate(`/character/${char.charID}`);
        });
      });
    };
    const updateLevel = (arg: number) => {
      console.log(arg);
    };
    return (
      <>
        <Grid container>
          <Grid container item justifyContent="center">
            <p>
              <Link className="nonDecLink" to={`/character/${char.charID}`}>
                {char?.charName}
              </Link>{" "}
              - Edit Levels
            </p>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            container
            item
            justifyContent="center"
            direction="column"
            rowGap={2}
          >
            <form>
              <Grid
                container
                item
                justifyContent="center"
                direction="column"
                rowGap={2}
              >
                {levels.map((lvl) => (
                  <LevelRow
                    level={lvl}
                    updateLevel={(arg) => updateLevel}
                    addingLevel={addingStat}
                  />
                ))}
              </Grid>
              <Divider
                color="#fff"
                style={{
                  margin: "24px 0",
                  borderTopWidth: "2px",
                  borderTopColor: "#6a6a6a",
                }}
              />
              {!addingStat && (
                <Grid
                  container
                  item
                  justifyContent="center"
                  direction="row"
                  rowGap={5}
                  columnGap={2}
                >
                  <Button
                    onClick={() => setAddingStat(true)}
                    variant="contained"
                  >
                    Add New
                  </Button>
                  <Button
                    onClick={() => {
                        navigate(`/character/${char.charID}`);
                    }}
                    variant="contained"
                  >
                    Back
                  </Button>
                </Grid>
              )}
            </form>
          </Grid>
          {addingStat && (
            <>
              <Grid
                container
                item
                justifyContent="center"
                direction="row"
                columnGap={2}
              >
                <Grid item style={{ alignSelf: "left" }}>
                  <FormControl>
                    <InputLabel variant="filled" htmlFor="new-class-select">
                      Class
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="new-class-select"
                      style={{ minWidth: "200px", backgroundColor: "white" }}
                      onChange={(event) => setNewClass(event.target.value)}
                      value={newClass}
                    >
                      {charClasses.map((aClass: CharClass) => {
                        return (
                          <MenuItem value={aClass.classID}>
                            {aClass.className}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    type="number"
                    value={newLevel}
                    onChange={(event) => setNewLevel(event.target.value)}
                    InputProps={{ inputProps: { min: "1", step: "1" } }}
                  />
                </Grid>
              </Grid>
              <Grid
                style={{ margin: "24px 0" }}
                container
                item
                justifyContent="center"
                direction="row"
                rowGap={5}
                columnGap={2}
              >
                <Button
                  onClick={() => setAddingStat(false)}
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button onClick={saveLevels} variant="contained">
                  Save
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </>
    );
  }
};
