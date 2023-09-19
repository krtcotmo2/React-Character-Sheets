import { Select, MenuItem, TextField, Grid, Button } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { batch, useSelector } from 'react-redux';
import { Character } from '../../interfaces/character';
import { store } from '../../redux/configure-store';
import { alignments, getAlignment, getRaces, races } from '../../enum/coreVals';
import { buildChar } from './buisness-logic/handle-char-modify';
import { updateCharacter } from '../../api/character-api';
import { CharLevel } from '../../interfaces/levels';
import { SavingThrow } from '../../interfaces/saving-throw';
import { RawSkill } from '../../interfaces/skills';
import { Stat } from '../../interfaces/stat';
import { ToHitGroup } from '../../interfaces/to-hit';
import { CharacterActions } from '../../redux/reducers/character-reducer';
import { CharLevelActions } from '../../redux/reducers/level-reducer';
import { SavesActions } from '../../redux/reducers/saves-reducer';
import { SkillActions } from '../../redux/reducers/skills.reducer';
import { StatsActions } from '../../redux/reducers/stats-reducer';
import { ToHitActions } from '../../redux/reducers/to-hit-reducer';

interface CoreProps{
    whatIsModified?: string;
    currentValue?: number;
}

  
export const CoreModifier: React.FC<CoreProps> = (props: CoreProps) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [input, setInput] = useState('');
    const [align, setAlign] = useState('');
    const [race, setRace] = useState('');
    const char: Character = useSelector(state => store.getState().character);
    
    useEffect( () => {
        setAlign(getAlignment(state.currentValue).toString());
        setRace(getRaces(state.currentValue).toString());
        setInput(state.currentValue);
    },[]);

    const updateChar = async () =>{
        const inputVal = state.whatIsModified === "Hit Points" ? input :
            state.whatIsModified === "Image" ? input :
            state.whatIsModified === "Name" ? input :
            state.whatIsModified === "Initiative" ? input :
            state.whatIsModified === "Alignment" ? align : race;
        const updatedChar = buildChar(char, state.whatIsModified, inputVal);
        await updateCharacter(updatedChar).then(charData => {
            batch(()=>{
                store.dispatch(CharacterActions.setCharacter(charData as Character));
                store.dispatch(StatsActions.setStat(charData?.stats as Stat));
                store.dispatch(SavesActions.setSaves(charData?.saves as SavingThrow));
                store.dispatch(SkillActions.setSkills(charData?.skills as RawSkill[]));
                store.dispatch(CharLevelActions.setCharLevels(charData?.levels as CharLevel[]));
                store.dispatch(ToHitActions.setToHitGroups(charData?.toHitGroups as ToHitGroup[]));
            });
            navigate(`/character/${char.charID}`);
        });
    }

    return (
        <>
            <Grid container>
                <Grid container item justifyContent="center">
                <p>
                    <Link
                    className="nonDecLink"
                    to={`/character/${char.charID}`}
                    >
                    {char?.charName}
                    </Link>{" "}
                    - Edit {state.whatIsModified}
                </p>
                </Grid>
        </Grid>
        <Grid container>
            <Grid container item justifyContent="center" direction='column' rowGap={2} alignItems='center'>
                {state.whatIsModified === 'Alignment' &&
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={align}
                        onChange={(event) => setAlign(event.target.value)}
                        inputProps={{
                            inputProps: {
                                placeholder: state.whatIsModified,
                            }
                        }}
                    >
                        c
                        <MenuItem value={13}>Lawful Neutral</MenuItem>
                        <MenuItem value={14}>Lawful Evil</MenuItem>
                        <MenuItem value={15}>Neutral Good</MenuItem>
                        <MenuItem value={16}>True Neutral</MenuItem>
                        <MenuItem value={17}>Neutral Evil</MenuItem>
                        <MenuItem value={18}>Chaotic Good</MenuItem>
                        <MenuItem value={19}>Chaotic Neutral</MenuItem>
                        <MenuItem value={20}>Chaotic Evil</MenuItem>
                    </Select>
                }
                {state.whatIsModified === 'Race' &&
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                       
                        value={race}
                        onChange={(event) => setRace(event.target.value)}
                        inputProps={{
                            inputProps: {
                                placeholder: state.whatIsModified,
                            }
                        }}
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
                }
                {(
                    state.whatIsModified === 'Hit Points' ||  
                    state.whatIsModified === 'Initiative' ||  
                    state.whatIsModified === 'Image' ||  
                    state.whatIsModified === 'Name') 
                    &&
                    <TextField
                        required
                        placeholder={state.whatIsModified}
                        type= {(state.whatIsModified === 'Name' || state.whatIsModified === 'Image') ? 'text' : 'number'}
                        value={input}
                        onChange={event => setInput(event?.target.value)}
                    />
                }  

            </Grid>
        </Grid>
        <Grid style={{margin:'24px 0'}}container item justifyContent="center" direction='row' rowGap={5} columnGap={2} >
            <Button onClick={ ()=> navigate(`/character/${char.charID}`) } variant="contained">Cancel</Button> 
            <Button variant="contained" onClick={updateChar}>Save</Button> 
        </Grid>
        </>
    )
}