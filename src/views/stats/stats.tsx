import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/configure-store";
import { Stat } from "../../interfaces/stat";
import { CollapsibleRow } from "../../components/collapsible-row/collapsible-row";

export const CharacterStats: React.FC = (): JSX.Element => {
    const char: Stat = useSelector(state => store.getState().stats);

    return (
        <div style={{padding:'72px 24px 0px 24px'}}>
            <CollapsibleRow title='Strength' value={char.str.value} breakdown={char.str.breakdown} includeStatBonus= {true}/>
            <CollapsibleRow title='Dexterity' value={char.dex.value} breakdown={char.dex.breakdown} includeStatBonus= {true}/>
            <CollapsibleRow title='Constitution' value={char.con.value} breakdown={char.con.breakdown} includeStatBonus= {true}/>
            <CollapsibleRow title='Intelligence' value={char.int.value} breakdown={char.int.breakdown} includeStatBonus= {true}/>
            <CollapsibleRow title='Wisdom' value={char.wis.value} breakdown={char.wis.breakdown} includeStatBonus= {true}/>
            <CollapsibleRow title='Charisma' value={char.chr.value} breakdown={char.chr.breakdown} includeStatBonus= {true}/>
        </div>
    )
} 