import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { Character, SaveCharacter } from "../../interfaces/character";
import { useStyles } from "./character-styles";
import { store } from "../../redux/configure-store";
import { saveCharacter } from "../../api/character-api";
import { useNavigate } from "react-router-dom";

const NewCharacter: React.FunctionComponent = (): JSX.Element => {
  const { classes } = useStyles();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [initiative, setInitiative] = useState('');
  const [race, setRace] = useState('');
  const [alignment, setAlignment] = useState('');
  const [hp, setHP] = useState('');
  const [xp, setXP] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newChar: SaveCharacter = {
        charName: name,
        alignID: +alignment,
        charHP: +hp,
        CharXP: +xp,
        image: image === '' ? 'default.png' : image,
        init: +initiative,
        isDead: false,
        raceID: +race,
        userID: +store.getState().user.id
    }
    const ch = await saveCharacter(newChar);
    navigate(`/character/levels/${ch.charID}`);
  };
  return (
    <>
      <Grid container>
        <Grid container item justifyContent="center">
          <p>New Character</p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item justifyContent="center">
          <form onSubmit={(event) => handleSubmit(event)}>
            <Grid
              container
              columnGap="12px"
              rowGap="12px"
              style={{ paddingTop: "12px" }}
              direction="row"
              wrap="wrap"
              justifyContent="center"
            >
              <TextField
                value={name} 
                onChange={ (evt)=> setName(evt.target.value) }
                label="Character Name"
                required
                className={classes.inputField}
              />
              <TextField
                value={initiative}
                onChange={ (evt)=> setInitiative(evt.target.value) }
                label="Initiative"
                type="number"
                className={classes.inputField}
              />
              <FormControl  className={classes.inputField}>
                <InputLabel id="demo-simple-select-label">Race</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Alignment"
                  value={race}
                  onChange={(event => setRace(event.target.value))}
                >
                  <MenuItem value={13}>Aasimar</MenuItem>
                  <MenuItem value={14}>Catfolk</MenuItem>
                  <MenuItem value={1}>Dwarf</MenuItem>
                  <MenuItem value={12}>Dragonborn</MenuItem>
                  <MenuItem value={2}>Elf</MenuItem>
                  <MenuItem value={3}>Gnome</MenuItem>
                  <MenuItem value={4}>Halfling</MenuItem>
                  <MenuItem value={5}>Half-elf</MenuItem>
                  <MenuItem value={6}>Half-orc</MenuItem>
                  <MenuItem value={7}>Human</MenuItem>
                  <MenuItem value={15}>Tengu</MenuItem>
                  <MenuItem value={22}>Tiefling</MenuItem>
                  <MenuItem value={10}>Bird</MenuItem>
                  <MenuItem value={8}>Black Bear</MenuItem>
                  <MenuItem value={9}>Mountain Lion</MenuItem>
                </Select>
              </FormControl>
              <FormControl  className={classes.inputField}>
                <InputLabel id="demo-simple-select-label">Alignment</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Alignment"
                  value={alignment}
                  onChange={(event => setAlignment(event.target.value))}
                >
                  <MenuItem value={12}>Lawful Good</MenuItem>
                  <MenuItem value={13}>Lawful Neutral</MenuItem>
                  <MenuItem value={14}>Lawful Evil</MenuItem>
                  <MenuItem value={15}>Neutral Good</MenuItem>
                  <MenuItem value={16}>True Neutral</MenuItem>
                  <MenuItem value={17}>Neutral Evil</MenuItem>
                  <MenuItem value={18}>Chaotic Good</MenuItem>
                  <MenuItem value={19}>Chaotic Neutral</MenuItem>
                  <MenuItem value={20}>Chaotic Evil</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                value={hp}
                onChange={ (evt)=> setHP(evt.target.value) }
                label="Hit Points"
                required
                type="number"
                className={classes.inputField}
              />
              <TextField
               value={xp}
               onChange={ (evt)=> setXP(evt.target.value) }
               label="Experience Points"
                type="number"
                className={classes.inputField}
              />
              <TextField
               value={image}
               onChange={ (evt)=> setImage(evt.target.value) }
               label="Image"
                className={classes.inputField}
              />
              </Grid>
              <Grid container item justifyContent="center" className="standardList">
                <Button type="submit" variant="contained">Submit</Button>
              </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default NewCharacter;
