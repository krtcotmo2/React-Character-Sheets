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
import { useNavigate } from 'react-router-dom';
import { WHATISMOD } from '../../enum/what-is-mod-type';
import { Armor, ArmorSet } from '../../interfaces/armor';
import { getFFAC, getTouchAC } from '../../views/armor/business-logic/armor-helper';
import { pinArmor, unpinArmor } from '../../api/armor-api';

interface RowProps {
    title: string;
    value?: number;
    breakdown: Modifier[];
    includeStatBonus?: boolean;
    skillData?: Skill;
    altText?: string;
    toHitData?: ToHitGroup;
    armorData?: ArmorSet;
    acID?: number
    allowEditing?: boolean;
    characteristic?: WHATISMOD;
    desc?: any;
}


export const CollapsibleRow: React.FC<RowProps> = (props: RowProps): JSX.Element => {
    const [hidden, setHidden] = useState(true);
    const [pinned, setPinned] = useState(props.skillData?.pinned || props.toHitData?.pinned|| props.armorData?.pinned);
    const charOwner = useSelector(state => store.getState().character.userID.toString());
    const userId = useSelector(state => store.getState().user.id)
    const navigate = useNavigate();
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
        if(props.characteristic === 'Armor'){
            if(!pinned){
                pinArmor(char.charID.toString(), armor?.toString() || '');
            }else{
                unpinArmor(char.charID.toString(), armor?.toString() || '');
            }
            setPinned(!pinned);
        }
    }
    const { classes } = useStyles();
    const skillData = props.skillData;
    const tohitData = props.toHitData;
    const armor = props.acID ;
    const allowEdit = props.allowEditing === undefined ?  true : props.allowEditing;
    const {title, value, breakdown, includeStatBonus, altText, desc} = props;
    const editStat = ( a: string) => {
        navigate('/character/characteristic/edit', {
            replace: true, 
            state: {
                whatIsMod: props.characteristic, 
                modified: a, 
                id: skillData?.skillID || tohitData?.id || armor,
                pinned: skillData?.pinned
            }
        })
    }
    return (
        <Grid container className={classes.collapsibleRowContainer} direction={'column'}>
            <Grid container item direction={'row'} flexWrap='nowrap'>
                <Grid item container direction='row' wrap='nowrap' flexGrow={1} style={{textAlign: 'left', width: 'fit-content'}} gap={2}>
                    <span>{title} </span><span style={{color: 'rgba(159,6,6,1)', fontWeight: '700'}}>{value}
                    {props.characteristic === WHATISMOD.ARMOR && (<> <span>/ {getTouchAC(breakdown)}</span> <span>/ {getFFAC(breakdown)}</span></>)}
                    </span>
                </Grid>
                {/* <Grid item container  flexShrink={1} style={{maxWidth: 'fit-content'}}>    
                    <InfoIcon onClick={clickIcon} className={`${classes.iconPadded}`}/>
                </Grid> */}
                {props.characteristic === WHATISMOD.STAT && (
                    <Grid item container flexShrink={1} style={{textAlign: 'left', paddingLeft: '18px'}}> 
                        {includeStatBonus ? calcAndShowBonus(value) : ''} {altText}
                    </Grid>
                )}
                {
                    userId === charOwner  && allowEdit &&
                    (<Grid item container flexShrink={1} style={{maxWidth: 'fit-content', alignContent:'start'}}>
                        <EditIcon className={classes.editIcon} onClick={() => editStat(title)}/>
                    </Grid>)
                }
                <Grid item container  flexShrink={1} style={{maxWidth: 'fit-content'}}> 
                    {(props.skillData || props.toHitData || props.characteristic === 'Armor') && pinned && (
                        <PushPinIcon onClick={togglePinned} className={`${classes.iconPadded}`}/>
                    )}
                    {(props.skillData || props.toHitData ||  props.characteristic === 'Armor') && !pinned && (
                        <PushPinIconOutlined onClick={togglePinned} className={`${classes.iconPadded}`}/>
                    )}   
                </Grid>
                <Grid item container  flexShrink={1} style={{maxWidth: 'fit-content'}}>    
                    <InfoIcon onClick={clickIcon} className={`${classes.iconPadded}`}/>
                </Grid>
            </Grid>
            <Grid container direction={'column'} className={`${hidden ? 'hidden' : ''}`} >
                {breakdown.map( (mod, i) => (<Grid key={i} container item className={`${classes.breakDownSection}`}>{mod.score} - {getDescription(mod, mod.modDesc)}</Grid>))}
            </Grid>
            {
                desc?.id &&
                <Grid container direction={'column'} className={`${hidden ? 'hidden' : ''}`} >
                    <Grid item style={{textAlign:'left'}}>Type: {desc.type}</Grid>
                    <Grid item style={{textAlign:'left', paddingBottom: '16px'}}>Prerequisite: {desc.prerequisites || 'none'}</Grid>
                    <Grid item style={{textAlign:'left', paddingBottom: '16px'}}>Description: {desc.shortdescription}</Grid>
                    <Grid item style={{textAlign:'left', paddingBottom: '16px'}}>{desc.benefit}</Grid>
                    <Grid item style={{textAlign:'left', paddingBottom: '16px'}}>{desc.normal}</Grid>
                    <Grid item style={{textAlign:'left'}}>{desc.special}</Grid>
                </Grid>
            }
            
        </Grid>
    )
}

export const calcAndShowBonus = (statValue: number | undefined): string => {
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

