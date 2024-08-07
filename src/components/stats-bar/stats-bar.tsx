import React from "react";
import { Grid } from "@mui/material";
import { Stat } from "../../interfaces/stat";
import { Link } from "react-router-dom";
import { store } from "../../redux/configure-store";
import { Character } from "../../interfaces/character";
import { useSelector } from "react-redux";



export const StatsBar: React.FC<StatProps> = (props: StatProps): JSX.Element => {
    const { str, dex, con, int, chr, wis } = props.stats;
    const char: Character = useSelector(state => store.getState().character);

  return (
    <Grid container direction="row" justifyContent={"center"} gap={2} style={{fontSize:'18px'}}>
      <Grid item>
        <Link style={{display:'block', margin:'18px 0'}} to={`/character/stats/${char.charID}`}>Stats</Link>
      </Grid>
      <Grid item>
        <p>Str: {str.value} {statBonus(str.value)}</p>
      </Grid>
      <Grid item>
        <p>Dex: {dex.value} {statBonus(dex.value)}</p>
      </Grid>
      <Grid item>
        <p>Con: {con.value} {statBonus(con.value)}</p>
      </Grid>
      <Grid item>
        <p>Int: {int.value} {statBonus(int.value)}</p>
      </Grid>
      <Grid item>
        <p>Wis: {wis.value} {statBonus(wis.value)}</p>
      </Grid>
      <Grid item>
        <p>Chr: {chr.value} {statBonus(chr.value)}</p>
      </Grid>
    </Grid>
  );
};

interface StatProps{
    stats: Stat;
}

const statBonus = (stat: number): string =>{
    const bonus = Math.floor((stat - 10) /2);
    if(bonus === 0){
       return '(0)'
    }else if(bonus > 0){
        return `(+${bonus.toString()})`
    }else{
        return `(${bonus.toString()})`
    }
    
}