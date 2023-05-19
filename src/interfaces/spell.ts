export interface Spell {
    id: string;
    spellID?: string;
    charID: string;
    spellLevel: number;
    spellName: string;
    isCast:boolean
}

export interface SpellLevelCategory{
    spellLevel: number;
    quantity: number;
    cast: number;
    dcCheck: number;
    spells: Spell[]
}