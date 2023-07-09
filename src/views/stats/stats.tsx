import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/configure-store";
import { Stat } from "../../interfaces/stat";
import { CollapsibleRow } from "../../components/collapsible-row/collapsible-row";
import { Button, Divider, Grid } from "@mui/material";
import { Character } from "../../interfaces/character";
import { AddTempAdjustment, FromInput } from "../../components/add-temp-adjustment/add-temp-bar";
import { ModifierType } from "../../enum/modifier-type";
import { TempBonus } from "../../components/temp-bonus/temp-bonus";
import { Modifier } from "../../interfaces/modifier";
import { Link } from "react-router-dom";
import { WHATISMOD } from "../../enum/what-is-mod-type";

export const CharacterStats: React.FC = (): JSX.Element => {
    const charStats: Stat = useSelector(state => store.getState().stats);
    const [allTemps, setAllTemps] = useState<Modifier[]>([]);
    const char: Character = useSelector(state => store.getState().character);
    const [showAdj, setShowAdj] = useState(false);
    const toggleShowNewAdjustment = (): void => {
        setShowAdj(!showAdj);
    }

    useEffect(()=> {
        const arr = [
            ...charStats.str.breakdown.filter(mod => mod.type === ModifierType.TEMPORARY)
            .map(arg => ({...arg, stat:' Str'})),
            ...charStats.dex.breakdown.filter(mod => mod.type === ModifierType.TEMPORARY)
            .map(arg => ({...arg, stat:' Dex'})),
            ...charStats.con.breakdown.filter(mod => mod.type === ModifierType.TEMPORARY)
            .map(arg => ({...arg, stat:' Con'})),
            ...charStats.int.breakdown.filter(mod => mod.type === ModifierType.TEMPORARY)
            .map(arg => ({...arg, stat:' Int'})),
            ...charStats.wis.breakdown.filter(mod => mod.type === ModifierType.TEMPORARY)
            .map(arg => ({...arg, stat:' Wis'})),
            ...charStats.chr.breakdown.filter(mod => mod.type === ModifierType.TEMPORARY)
            .map(arg => ({...arg, stat:' Chr'})),
        ];
        setAllTemps(arr);
    },[charStats]);

    const formItems: FromInput[] = [
        {
          label: 'Str',
          propName: 'str'
        },
        {
          label: 'Dex',
          propName: 'dex'
        },
        {
          label: 'Con',
          propName: 'con'
        },
        {
          label: 'Int',
          propName: 'int'
        },
        {
          label: 'Wis',
          propName: 'wis'
        },
        {
          label: 'Chr',
          propName: 'chr'
        },
    ]
    
    return (
        <>
            <Grid container>
                <Grid container item justifyContent='center'>
                <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Stats</p>
                </Grid>
            </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
                <Grid item className="standardRow">
                    <CollapsibleRow 
                        title='Strength' 
                        value={charStats.str.value} 
                        breakdown={charStats.str.breakdown} 
                        includeStatBonus= {true}
                        altText="Melee Attack and Damage and Str based skill checks"
                        characteristic={WHATISMOD.STAT}/>
                </Grid>
                <Grid item className="standardRow">
                    <CollapsibleRow 
                        title='Dexterity' 
                        value={charStats.dex.value} 
                        breakdown={charStats.dex.breakdown} 
                        includeStatBonus= {true}
                        altText="Ranged Attack and AC Bonus and Reflex Save and Dex based skill checks"
                        characteristic={WHATISMOD.STAT}/>
                </Grid>
                <Grid item className="standardRow">
                    <CollapsibleRow 
                        title='Constitution' 
                        value={charStats.con.value} 
                        breakdown={charStats.con.breakdown} 
                        includeStatBonus= {true}
                        altText="HP and Fort Save and Con based skill checks"
                        characteristic={WHATISMOD.STAT}/>
                    </Grid>
                <Grid item className="standardRow">
                    <CollapsibleRow 
                        title='Intelligence' 
                        value={charStats.int.value} 
                        breakdown={charStats.int.breakdown} 
                        includeStatBonus= {true}
                        altText="Skill points and Int based skill checks"
                        characteristic={WHATISMOD.STAT}/>
                </Grid>
                <Grid item className="standardRow">
                    <CollapsibleRow 
                        title='Wisdom' 
                        value={charStats.wis.value}
                        breakdown={charStats.wis.breakdown} 
                        includeStatBonus= {true}
                        altText="Will Save and Wis based skill checks"
                        characteristic={WHATISMOD.STAT}/>
                </Grid>
                <Grid item className="standardRow">
                    <CollapsibleRow 
                        title='Charisma' 
                        value={charStats.chr.value} 
                        breakdown={charStats.chr.breakdown} 
                        includeStatBonus= {true}
                        altText="Chr based skill checks"
                        characteristic={WHATISMOD.STAT}/>
                </Grid>
            </Grid>
            <Divider color='#fff' style={{margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
            <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
                { allTemps.map( (temp: Modifier) => {
                    return (
                        <Grid item className="standardRow" key={temp.guid}>
                            <TempBonus title={temp.modDesc} value={temp.score} guid={temp.id.toString()} reducer='stats' stat={temp.stat}/>
                        </Grid>
                    )
                })
                }
                <Grid item>
                    {!showAdj && (<Button onClick={toggleShowNewAdjustment} variant="contained">Add Temp Bonus</Button>)}
                    {showAdj && (<AddTempAdjustment items={formItems} showMethod={toggleShowNewAdjustment} category='stats'/>)}
                </Grid>
            </Grid>
        </>
    )
} 