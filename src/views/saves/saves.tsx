import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/configure-store";
import { SavingThrow } from "../../interfaces/saving-throw";
import { CollapsibleRow } from "../../components/collapsible-row/collapsible-row";
import { Button, Divider, Grid } from "@mui/material";
import { Character } from "../../interfaces/character";
import { AddTempAdjustment, FromInput } from "../../components/add-temp-adjustment/add-temp-bar";
import { Modifier } from "../../interfaces/modifier";
import { ModifierType } from "../../enum/modifier-type";
import { TempBonus } from "../../components/temp-bonus/temp-bonus";
import _ from "lodash";
import { Link } from "react-router-dom";

export const CharacterSaves: React.FC = (): JSX.Element => {
  const charSave: SavingThrow = useSelector((state) => store.getState().saves);
  const [allTemps, setAllTemps] = useState<Modifier[]>([]);
  const char: Character = useSelector((state) => store.getState().character);
  const [showAdj, setShowAdj] = useState(false);

  const toggleShowNewAdjustment = (): void => {
    setShowAdj(!showAdj);
  }
  const formItems: FromInput[] = [
    {
      label: 'Fortitude',
      propName: 'fort'
    },
    {
      label: 'Reflex',
      propName: 'reflex'
    },
    {
      label: 'Will',
      propName: 'will'
    },
  ]
  useEffect(()=> {
    const arr = [
        ...charSave.fortitude.breakdown.filter(mod => mod.type === ModifierType.TEMPORARY)
          .map(arg => ({...arg, stat:' Fort'})),
        ...charSave.reflex.breakdown.filter(mod => mod.type === ModifierType.TEMPORARY)
          .map(arg => ({...arg, stat:' Reflex'})),
        ...charSave.will.breakdown.filter(mod => mod.type === ModifierType.TEMPORARY)
          .map(arg => ({...arg, stat:' Will'})),
    ];
    setAllTemps(_.uniqWith(arr, _.isEqual));
  },[charSave]);

  return (
    <>
      <Grid container>
        <Grid container item justifyContent="center">
        <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Saves</p>
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
      <Divider color='#fff' style={{margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
      <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
      { allTemps.map( (temp: Modifier) => {
                    return (
                        <Grid item className="standardRow">
                            <TempBonus 
                              title={temp.modDesc}
                              value={temp.score}
                              guid={temp.id.toString()}
                              reducer='saves'
                              stat={temp.stat}
                            />
                        </Grid>
                    )
                })
                }
        <Grid item>
          {!showAdj && (<Button onClick={toggleShowNewAdjustment} variant="contained">Add Temp Bonus</Button>)}
          {showAdj && (<AddTempAdjustment items={formItems} showMethod={toggleShowNewAdjustment} category='saves'/>)}
        </Grid>
      </Grid>
    </>
  );
};
