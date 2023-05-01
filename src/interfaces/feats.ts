import { FeatType } from "../enum/feat-type";

export interface Feat{
    id: string;
    featID: string;
    charID: string;
    desc: {
        name: string;
        featType: FeatType;
        shortDescription: string;
        benefit: string;
    }
}
