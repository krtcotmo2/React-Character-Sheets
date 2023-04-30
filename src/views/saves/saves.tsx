import React from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/configure-store";
import { SavingThrow } from "../../interfaces/saving-throw";
import { CollapsibleRow } from "../../components/collapsible-row/collapsible-row";

export const CharacterSaves: React.FC = (): JSX.Element => {
    const char: SavingThrow = useSelector(state => store.getState().saves);

    return (
        <div style={{padding:'72px 24px 0px 24px'}}>
            <CollapsibleRow title='Fortitude' value={char.fortitude.value} breakdown={char.fortitude.breakdown}/>
            <CollapsibleRow title='Reflex' value={char.reflex.value} breakdown={char.reflex.breakdown}/>
            <CollapsibleRow title='Will' value={char.will.value} breakdown={char.will.breakdown}/>
        </div>
    )
} 