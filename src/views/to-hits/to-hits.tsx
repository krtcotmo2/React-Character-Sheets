import { Button, Divider, FormControlLabel, Grid, Switch, SwitchProps, TextField, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/configure-store";
import { getCharacterToHits } from "../../api/to-hit-api";
import { formatToHits } from "./business-logic/to-hit-logic";
import { ToHitGroup } from "../../interfaces/to-hit";
import { ToHitActions } from "../../redux/reducers/to-hit-reducer";
import { CollapsibleRow } from "../../components/collapsible-row/collapsible-row";
import { ModifierType } from "../../enum/modifier-type";
import { DamageRow } from "../../components/damage-row/damage-row";
import { Link } from "react-router-dom";
import { WHATISMOD } from "../../enum/what-is-mod-type";
import { IOSSwitch } from "../../components/ios-switch/ios-switch";

export const ToHitView: React.FC = (): JSX.Element => {
  
  const [isAdding, setIsAdding] = useState(false);
  const [isMelee, setIsMelee] = useState(true);
  const [toHitName, setToHitName] = useState('');
  const [damage, setDamage] = useState('');
  const [critRange, setCritRange] = useState('');
  const levels = useSelector((state) => store.getState().levels);
  const stats = useSelector((state) => store.getState().stats);
  const char = useSelector((state) => store.getState().character);
  const toHit = levels.reduce((orig, lvl) => orig + lvl.toHit, 0);
  const strBonus = Math.floor((stats.str.value - 10) / 2);
  const dexBonus = Math.floor((stats.dex.value - 10) / 2);
  const [curToHits, setCurToHits] = useState<ToHitGroup[]>([]);

  useEffect(() => {
    getCharacterToHits(store.getState().character.charID.toString()).then(
      (currentHits) => {
        const toHitGroups = formatToHits(currentHits);
        setCurToHits(toHitGroups);
        store.dispatch(ToHitActions.setToHitGroups(toHitGroups));
      }
    );
  }, []);

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
            - To Hits
          </p>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent={"center"}
        style={{ fontSize: "18px" }}
      >
        <Grid
          container
          direction="column"
          justifyContent={"center"}
          style={{ fontSize: "18px", padding: "0" }}
          className="standardList"
        >
          <Grid item className="standardRow">
            <CollapsibleRow
              title="Base Melee"
              value={toHit + strBonus}
              allowEditing={false}
              breakdown={[
                {
                  id: 0,
                  score: toHit,
                  type: ModifierType.MODIFIER,
                  modDesc: "Base to Hit",
                },
                {
                  id: 0,
                  score: strBonus,
                  type: ModifierType.MODIFIER,
                  modDesc: "Strength Bonus",
                },
              ]}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent={"center"}
          style={{ fontSize: "18px", padding: "0" }}
          className="standardList"
        >
          <Grid item className="standardRow">
            <CollapsibleRow
              title="Base Ranged"
              value={toHit + dexBonus}
              allowEditing={false}
              breakdown={[
                {
                  id: 0,
                  score: toHit,
                  type: ModifierType.MODIFIER,
                  modDesc: "Base to Hit",
                },
                {
                  id: 0,
                  score: dexBonus,
                  type: ModifierType.MODIFIER,
                  modDesc: "Dexterity Bonus",
                },
              ]}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent={"center"}
          style={{ fontSize: "18px", padding: "0" }}
          className="standardList"
        >
          <Grid item className="standardRow">
            <CollapsibleRow
              title="Base CMB"
              value={toHit + strBonus}
              allowEditing={false}
              breakdown={[
                {
                  id: 0,
                  score: toHit,
                  type: ModifierType.MODIFIER,
                  modDesc: "Base to Hit",
                },
                {
                  id: 0,
                  score: strBonus,
                  type: ModifierType.MODIFIER,
                  modDesc: "Strength Bonus",
                },
              ]}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent={"center"}
          style={{ fontSize: "18px", padding: "0" }}
          className="standardList"
        >
          <Grid item className="standardRow">
            <CollapsibleRow
              title="Base CMD"
              value={10 + toHit + dexBonus + strBonus}
              allowEditing={false}
              breakdown={[
                {
                  id: 0,
                  score: 10,
                  type: ModifierType.MODIFIER,
                  modDesc: "Base",
                },
                {
                  id: 0,
                  score: toHit,
                  type: ModifierType.MODIFIER,
                  modDesc: "Base to Hit",
                },
                {
                  id: 0,
                  score: strBonus,
                  type: ModifierType.MODIFIER,
                  modDesc: "Strength Bonus",
                },
                {
                  id: 0,
                  score: dexBonus,
                  type: ModifierType.MODIFIER,
                  modDesc: "Dexterity Bonus",
                },
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
      <Divider
        color="#fff"
        style={{
          margin: "12px 0",
          borderTopWidth: "2px",
          borderTopColor: "#6a6a6a",
        }}
      />
      <Grid
        container
        direction="column"
        justifyContent={"center"}
        style={{ fontSize: "18px", padding: "0" }}
        className="standardList"
      >
        {curToHits.map((hit) => (
          <Grid item className="standardRow" direction="column">
            <CollapsibleRow
              title={hit.hitName}
              value={toHit + (hit.isMelee ? strBonus : dexBonus) + hit.value}
              breakdown={[
                {
                  id: 0,
                  score: toHit,
                  type: ModifierType.MODIFIER,
                  modDesc: "Base to Hit",
                },
                {
                  id: 0,
                  score: hit.isMelee ? strBonus : dexBonus,
                  type: ModifierType.MODIFIER,
                  modDesc: (hit.isMelee ? "Strength" : "Dexterity") + " Bonus",
                },
                ...hit.breakdown,
              ]}
              toHitData={hit}
              characteristic={WHATISMOD.TOHIT}
            />
            <DamageRow
              critDamage={hit.critDamage}
              critRange={hit.critRange}
              damage={hit.damage}
            />
          </Grid>
        ))}
        
        <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
        
        {!isAdding &&
          <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
              <Button style={{width:'fit-content'}} variant="contained" onClick={()=>setIsAdding(true)}>Add New Defined To Hit</Button>
          </Grid>
        }
        {isAdding &&
                <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
                    <Grid item justifyContent={"center"} style={{fontSize:'18px'}} className="standardRow">
                        <TextField
                            style={{display:'flex', flexGrow:'1'}} 
                            value={toHitName}
                            onChange={ (evt)=> setToHitName(evt.target.value) }
                            placeholder='To Hit Title'
                            multiline
                        />
                    </Grid>
                    <Grid item justifyContent={"center"} style={{fontSize:'18px'}} className="standardRow">
                        <TextField
                            style={{display:'flex', flexGrow:'1'}} 
                            value={critRange}
                            onChange={ (evt)=> setCritRange(evt.target.value) }
                            placeholder='Crit Range'
                            multiline
                        />
                    </Grid>
                    <Grid item justifyContent={"center"} style={{fontSize:'18px'}} className="standardRow">
                        <TextField
                            style={{display:'flex', flexGrow:'1'}} 
                            value={damage}
                            onChange={ (evt)=> setDamage(evt.target.value) }
                            placeholder='Damage'
                            multiline
                        />
                    </Grid>
                    <Grid item justifyContent={"flex-start"} style={{fontSize:'18px'}} className="standardRow">
                      <FormControlLabel
                        control={
                          <>
                            <Typography style={{paddingLeft: '24px'}}>Melee Attack</Typography>
                            <IOSSwitch aria-label='Melee Attack' checked={isMelee} onClick={()=>setIsMelee(!isMelee)}/>
                          </>
                        }
                        label={isMelee ? 'Yes': 'No'}
                        labelPlacement='end'
                        style={{padding:'9px 0'}}
                      />
                    </Grid>
                    <Grid container direction="row" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList" columnGap={3}>
                        <Button style={{width:'fit-content', margin:'12px 0'}} variant="contained" onClick={()=>setIsAdding(false)}>Cancel</Button>
                        <Button style={{width:'fit-content', margin:'12px 0'}} variant="contained" onClick={()=>{}}>Save</Button>
                    </Grid>
                </Grid>
            }
     </Grid>
    </>
  );
};
