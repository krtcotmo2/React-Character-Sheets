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

export interface DefaultFeat{
    id: number;
    name: string;
    type: string;
    shortdescription: string;
    prerequisites: string;
    prerequisitie_feats: string[];
    benefit: string;
    normal: string;
    special: string
    
} 