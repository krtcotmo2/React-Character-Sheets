import React, { useState } from 'react';
import { Modifier } from '../../interfaces/modifier';

interface RowProps {
    title: string;
    value: number;
    breakdown: Modifier[];
    includeStatBonus?: boolean;
}

export const CollapsibleRow: React.FC<RowProps> = (props: RowProps): JSX.Element => {
    const {title, value, breakdown, includeStatBonus} = props;
    return (
        <>
            <p>{title}: {value} {includeStatBonus ? calcBonus(value) : ''}</p>
        </>
    )
}

export const calcBonus = (statValue: number): string => {
    const bonus = Math.floor((statValue - 10) / 2);
    return bonus >= 0 ? `+${bonus}`: bonus.toString();
}