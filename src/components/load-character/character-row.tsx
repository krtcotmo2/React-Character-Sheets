import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Character } from "../../interfaces/character";
import { buildLevelString } from "../character-view/business-logic/load-chars";
import { ExpendableAction } from "../../redux/reducers/expendables-reducer";
import { store } from "../../redux/configure-store";

interface RowsData {
    char: Character
}


export const CharacterRow: React.FC<RowsData> = (props:RowsData): JSX.Element => {
    const navigate = useNavigate();
    const {charName, levels, image, charHP, isDead, charID} =  props.char;
    const loadChar = (charID: number) => {
        store.dispatch(ExpendableAction.cleartExpendable());
        navigate(`/character/overview/${charID}`);
    }
    return (
        <Grid container gap={2}  className='characterRow standardRow' onClick={()=> loadChar(charID)}>
            <Grid item><img height={72} width={72} alt={charName} src={`../images/${image}`} /></Grid>
            <Grid container item direction='column' flexGrow={1}>
                <Grid container>{charName}</Grid>
                <Grid container style={{fontSize:'12px'}}>{buildLevelString(levels)}</Grid>
                <Grid container style={{fontSize:'12px'}}>HP: {charHP}</Grid>
            </Grid>
            {isDead && (<div className='deceasedBanner'>Deceased</div>)}
        </Grid>
    )
}