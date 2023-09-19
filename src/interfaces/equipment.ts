export interface Equipment {
    id: string | number;
    charID: string | number;
    equip: string;
    location: string;
    weight: number;
    equipOrder: number;
    partOfOverallWeight: boolean;
}

export interface EquipmentData {
    weight: number;
    items: Equipment[];
}