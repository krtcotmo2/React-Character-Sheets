import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { Equipment, EquipmentData } from "../../interfaces/equipment";

declare module '../../interfaces/equipment' {
    export const theEquip: EquipmentData;
}

const initialState:EquipmentData = {
    items: [],
    weight: 0
};

class EquipmentReducer  extends ImmerReducer<EquipmentData> {
    public setCharEquipment(equipmentData: EquipmentData){
        this.draftState = equipmentData
    }

    public setCharEquipmentItems(equipment: Equipment[]){
        this.draftState = {
            ...this.draftState,
            items: equipment
        }
    }

    public setCharEquipmentWeight(wt: number){
        this.draftState = {
            ...this.draftState,
            weight: wt
        }
    }

    public clearCharEquipment(){
        this.draftState = initialState;
    }
}

export const EquipmentActions = createActionCreators(EquipmentReducer);
export const EquipmentReducerFunctions = createReducerFunction(EquipmentReducer, initialState);