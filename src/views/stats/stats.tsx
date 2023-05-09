import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/configure-store";
import { Stat } from "../../interfaces/stat";
import { CollapsibleRow } from "../../components/collapsible-row/collapsible-row";
import { Grid } from "@mui/material";
import { Character } from "../../interfaces/character";

export const CharacterStats: React.FC = (): JSX.Element => {
    const charStats: Stat = useSelector(state => store.getState().stats);
    const char: Character = useSelector(state => store.getState().character);

    return (
        <>
            <Grid container>
                <Grid container item justifyContent='center'>
                    <p>{char?.charName} - Stats</p>
                </Grid>
            </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
                <Grid item className="standardRow">
                    <CollapsibleRow 
                        title='Strength' 
                        value={charStats.str.value} 
                        breakdown={charStats.str.breakdown} 
                        includeStatBonus= {true}
                        altText="Melee Attack and Damage and Str based skill checks"/>
                </Grid>
                <Grid item className="standardRow">
                    <CollapsibleRow 
                        title='Dexterity' 
                        value={charStats.dex.value} 
                        breakdown={charStats.dex.breakdown} 
                        includeStatBonus= {true}
                        altText="Ranged Attack and AC Bonus and Reflex Save and Dex based skill checks"/>
                </Grid>
                <Grid item className="standardRow">
                    <CollapsibleRow 
                        title='Constitution' 
                        value={charStats.con.value} 
                        breakdown={charStats.con.breakdown} 
                        includeStatBonus= {true}
                        altText="HP and Fort Save and Con based skill checks"/>
                    </Grid>
                <Grid item className="standardRow">
                    <CollapsibleRow 
                        title='Intelligence' 
                        value={charStats.int.value} 
                        breakdown={charStats.int.breakdown} 
                        includeStatBonus= {true}
                        altText="Skill points and Int based skill checks"/>
                </Grid>
                <Grid item className="standardRow">
                    <CollapsibleRow 
                        title='Wisdom' 
                        value={charStats.wis.value}
                        breakdown={charStats.wis.breakdown} 
                        includeStatBonus= {true}
                        altText="Will Save and Wis based skill checks"/>
                </Grid>
                <Grid item className="standardRow">
                    <CollapsibleRow 
                        title='Charisma' 
                        value={charStats.chr.value} 
                        breakdown={charStats.chr.breakdown} 
                        includeStatBonus= {true}
                        altText="Chr based skill checks"/>
                </Grid>
            </Grid>
        </>
    )
} 