import React, { useEffect, useRef, useState } from 'react';
import { SpellLevelBar } from './spell-level-bar';
import { SpellLevelCategory } from '../../interfaces/spell';
import { SpellRow } from './spell-row';


export interface SpellGrpProps {
    grp: SpellLevelCategory,
    isAdding: boolean,
    hidden: boolean
}


export const SpellGroup: React.FC<SpellGrpProps> = (props: SpellGrpProps): JSX.Element => {
    const {grp, isAdding} = props;
    const [holder, setHolder] = useState(props.hidden);
    const toggleBar = () => {
        setHolder(!holder);
    }
    return (
        <div className={`spellGrp ${holder ? 'hiddenContents' : ''}`}>
            
            <SpellLevelBar spellGrp={grp} onClick={()=> toggleBar()}/>
            {
                grp.spells.map(sp => {
                    return (<SpellRow key={`${sp.id}-${sp.charID}`} spell={sp} isAdding={isAdding}/>)
                } )
            }
        </div>
    )
};