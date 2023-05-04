import { ExpendableType } from "../enum/expendable-type";

export interface Expendable {
    id: string;
    charId: string;
    description: string;
    expType: ExpendableType | undefined;
    qty: number;
}