import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Character } from '../../interfaces/character';
import { batch, useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { CharClass, charClasses } from '../../enum/class-types';
import { CharLevel, SaveLevel } from "../../interfaces/levels";
import { deleteLevel, saveALevel } from "../../api/level-api";
import { CharLevelActions } from "../../redux/reducers/level-reducer";
import { getChar } from "../../api/character-api";
import { checkForCaster } from "../character-view/business-logic/load-chars";
import { SavingThrow } from "../../interfaces/saving-throw";
import { RawSkill } from "../../interfaces/skills";
import { Stat } from "../../interfaces/stat";
import { CharacterActions } from "../../redux/reducers/character-reducer";
import { SavesActions } from "../../redux/reducers/saves-reducer";
import { SkillActions } from "../../redux/reducers/skills.reducer";
import { StatsActions } from "../../redux/reducers/stats-reducer";
import Delete from '@mui/icons-material/Delete';

interface LevelsProps {
    level: CharLevel;
    updateLevel: (arg: number) => {};
    addingLevel?: boolean;
}


export const LevelRow: React.FC<LevelsProps> = (props: LevelsProps): JSX.Element => {
    const {level, updateLevel} = props;
    const levels = useSelector(state => store.getState().levels);
    const  char = useSelector(state => store.getState().character);
    const charIds = charClasses;
    const doLevel= async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=> {
        const newLevel: SaveLevel = {
            charID: char.charID,
            id: level.id,
            classID: charIds.find(cls => cls.className === level.className)?.classID || 0,
            classLevel: +event.target.value,
        } 
        await saveALevel(newLevel)
            .then(async results => {
                await getChar(char.charID.toString()) .then( (charData: Character | undefined) => {
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
            });
    }

    const deleteALevel = async () => {
        console.log(level.id);
        await deleteLevel(level.id)
            .then(async ()=> {
                return await getChar(char.charID.toString());
            })
            .then(charData => {
                store.dispatch(CharLevelActions.setCharLevels(charData?.levels as CharLevel[]));
            })
    }
    return (
        <>
            <Grid container item justifyContent="center" direction='row' columnGap={2} alignItems='center'>
                <Grid item style={{alignSelf:'center'}} justifyContent='center'>
                    {level.className}
                </Grid>
                <Grid item>
                    <TextField
                        required
                        type="number"
                        value={level.classLevel}
                        onChange={(event) => doLevel(event)}
                        disabled={props.addingLevel}
                        InputProps={{ inputProps: { min: "1", step: "1" } }}
                    />
                </Grid>
                <Delete style={{marginLeft:'12px', cursor:'pointer'}} onClick={deleteALevel}></Delete>
            </Grid>
        </>
    )
};