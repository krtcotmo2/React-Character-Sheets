import { ExpendableType } from "../enum/expendable-type";

export interface Expendable {
    id: string | number;
    charID: string | number;
    description: string;
    expType: ExpendableType | undefined;
    qty: number;
}