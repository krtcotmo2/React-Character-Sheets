import React, { useState } from 'react';
import { Modifier } from '../../interfaces/modifier';
import { Grid, } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinIconOutlined from '@mui/icons-material/PushPinOutlined';
import { useStyles } from './collapsible-row-styles';
import "../../App.css";
import { Skill } from '../../interfaces/skills';
import { ModifierType } from '../../enum/modifier-type';
import { pinSkill, unpinSkill } from '../../api/skills-api';
import { store } from '../../redux/configure-store';
import { ToHit, ToHitGroup } from '../../interfaces/to-hit';
import { pinToHit, unpinToHit } from '../../api/to-hit-api';
import { STAT_TYPE } from '../../enum/stat-type';
import { useSelector } from 'react-redux';

interface RowProps {
    title: string;
    value?: number;
    breakdown: Modifier[];
    includeStatBonus?: boolean;
    skillData?: Skill;
    altText?: string;
    toHitData?: ToHitGroup
    allowEditing?: boolean
}


export const CollapsibleRow: React.FC<RowProps> = (props: RowProps): JSX.Element => {
    const [hidden, setHidden] = useState(true);
    const [pinned, setPinned] = useState(props.skillData?.pinned || props.toHitData?.pinned);
    const charOwner = useSelector(state => store.getState().character.userID.toString());
    const userId = useSelector(state => store.getState().user.id);
    const clickIcon = (arg: any) => {
        setHidden(!hidden);
    }
    const char = store.getState().character;
    const togglePinned = () =>{
        if(props.skillData){
            if(!pinned){
                pinSkill(char.charID.toString(), skillData?.skillID.toString() || '');
            }else{
                unpinSkill(char.charID.toString(), skillData?.skillID.toString() || '');
            }
            setPinned(!pinned);
        }

        if(props.toHitData){
            if(!pinned){
                pinToHit(char.charID.toString(), tohitData?.id.toString() || '');
            }else{
                unpinToHit(char.charID.toString(), tohitData?.id.toString() || '');
            }
            setPinned(!pinned);
        }
    }
    const { classes } = useStyles();
    const skillData = props.skillData;
    const tohitData = props.toHitData;
    const allowEdit = props.allowEditing === undefined ?  true : props.allowEditing;
    const {title, value, breakdown, includeStatBonus, altText} = props;
    const editStat = ( a: string) => {
        console.log(Object.values(STAT_TYPE).indexOf(a)+1);
    }
    return (
        <Grid container className={classes.collapsibleRowContainer} direction={'column'}>
            <Grid container item direction={'row'} flexWrap='nowrap'>
                <Grid item container direction='row' wrap='nowrap' flexGrow={1} style={{width: 'fit-content', minWidth: 'fit-content'}} gap={2}>
                    <span>{title}: </span><span style={{color: 'rgba(159,6,6,1)', fontWeight: '700'}}>{value}</span>
                </Grid>
                <Grid item container  flexShrink={1} style={{maxWidth: 'fit-content'}}>    
                    <InfoIcon onClick={clickIcon} className={`${classes.iconPadded}`}/>
                </Grid>
                <Grid item container flexShrink={1} style={{textAlign: 'left', paddingLeft: '18px'}}> 
                    {includeStatBonus ? calcBonus(value) : ''} {altText}
                </Grid>
                {
                    userId === charOwner  && allowEdit &&
                    (<Grid item container  flexShrink={1} style={{maxWidth: 'fit-content'}}>
                        <EditIcon className={classes.editIcon} onClick={() => editStat(title)}/>
                    </Grid>)
                }
                <Grid item container  flexShrink={1} style={{maxWidth: 'fit-content'}}> 
                    {(props.skillData || props.toHitData) && pinned && (
                        <PushPinIcon onClick={togglePinned} className={`${classes.iconPadded}`}/>
                    )}
                    {(props.skillData || props.toHitData) && !pinned && (
                        <PushPinIconOutlined onClick={togglePinned} className={`${classes.iconPadded}`}/>
                    )}   
                </Grid>
                
            </Grid>
            <Grid container direction={'column'} className={`${hidden ? 'hidden' : ''}`} >
                {breakdown.map( (mod, i) => (<Grid key={i} container item className={`${classes.breakDownSection}`}>{mod.score} - {getDescription(mod, mod.modDesc)}</Grid>))}
            </Grid>
            
        </Grid>
    )
}

export const calcBonus = (statValue: number | undefined): string => {
    if(!statValue){
        return '';
    }
    const bonus = Math.floor((statValue - 10) / 2);
    return bonus >= 0 ? `+${bonus}`: bonus.toString();
}

export const getDescription = (skill: Modifier, modDescription: string) => {
    if(!skill){
        return modDescription;
    }
    switch(skill.type){
        case ModifierType.BASE: 
        return 'Ranks';
        case ModifierType.CLASSSKILL:
            return 'Class Skill';
        default:
            return modDescription;
    }

}

