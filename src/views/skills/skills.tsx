import React, { useEffect, useState } from 'react';
import { Skill, RawSkill } from '../../interfaces/skills';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { formatSkills } from './business-logic/skill-formatter';
import { CollapsibleRow } from '../../components/collapsible-row/collapsible-row';
import { Character } from '../../interfaces/character';
import { Button, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getAllSkills, saveNewSkill } from '../../api/skills-api';
import { SkillActions } from '../../redux/reducers/skills.reducer';
import { Link } from 'react-router-dom';
import { WHATISMOD } from '../../enum/what-is-mod-type';
import { skillOptions as skills } from './business-logic/skill-oprions';
import ClearIcon from '@mui/icons-material/Clear';
import { FilterBar } from '../../components/filter-bar/filter-bar';

interface SkillsProps {
    skills?: Skill[];
}


export const CharacterSkills:React.FC<SkillsProps> = (props: SkillsProps): JSX.Element => {
    const [isAdding, setIsAdding] = useState(false);
    const curSkills: RawSkill[] = useSelector(state => store.getState().skills);
    const [grpdSkills, setGrpdSkills ] = useState<Skill[]>([]);
    const char: Character = useSelector(state => store.getState().character);
    const [selectedSkill, setSelectedSkill] = useState('');
    const skillOptions = skills;
    const [listFilter, setListFilter] = useState('');

    useEffect(() => {
        getAllSkills(char.charID.toString()).then(skills => {
            setGrpdSkills(formatSkills(skills)); 
            store.dispatch(SkillActions.setSkills(skills as RawSkill[]));
        }) 
    }, []);

    useEffect(()=>{
        const a = formatSkills(curSkills);
        setGrpdSkills(a);
    }, [curSkills]);

    const saveSkill = () => {
        const skill = {
            skillID: +selectedSkill,
            charID: char.charID,
            score: 0,
            isMod: true,
            modDesc: 'Ranks',
            isClassSkill: false,
            isRanks: false,
            pinned: false,
        }
        saveNewSkill(char.charID.toString(), skill).then(arg => {
            setGrpdSkills(formatSkills(arg)); 
            store.dispatch(SkillActions.setSkills(arg as RawSkill[]));
            setSelectedSkill('');
            setIsAdding(false);
        }
        );
    }
    return (
        
        <>
            <Grid container>
                <Grid container item justifyContent="center">
                <p><Link className='nonDecLink' to={`/character/overview/${char.charID}`}>{char?.charName}</Link> - Skills</p>
                </Grid>
            </Grid>
            <FilterBar value={listFilter} setValue={setListFilter}/>
            <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
                {
                    grpdSkills.map(skl => {
                        if(skl.skillName.toLowerCase().includes(listFilter.toLowerCase())){
                            return (
                                <Grid item className="standardRow" key={skl.skillID}>
                                    <CollapsibleRow 
                                        title={skl.skillName} 
                                        breakdown={skl.breakdown} 
                                        value={skl.value}
                                        skillData={skl}
                                        characteristic={WHATISMOD.SKILL}
                                    />
                                </Grid>
                            )
                        }
                        return null;
                    })
                }
                
                <Divider color='#fff' style={{width:'100%', margin: '12px 0', borderTopWidth: '2px', borderTopColor:'#6a6a6a'}}/>
                {!isAdding &&
                    <Button style={{width:'fit-content'}} variant="contained" onClick={()=>setIsAdding(true)}>Add New Skill</Button>
                }
                {isAdding &&
                <Grid container direction="column" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList">
                    <Grid item justifyContent={"center"} style={{fontSize:'18px', background:'#e4dcc7'}} className="standardRow">
                           <Select
                                id="demo-simple-select"
                                variant="filled"
                                value={selectedSkill}
                                onChange={(event) => setSelectedSkill(event.target.value)}
                                style={{backgroundColor: 'none'}}
                                placeholder='Skill Name'
                                fullWidth
                            >
                                {skillOptions.map( skill => (
                                    <MenuItem value={skill.id} style={{background:'#e4dcc7'}}>{skill.skillName}</MenuItem>
                                ))}
                                
                            
                            </Select>
                    </Grid>
                    <Grid container direction="row" justifyContent={"center"} style={{fontSize:'18px'}} className="standardList" columnGap={3}>
                        <Button style={{width:'fit-content', margin:'12px 0'}} variant="contained" onClick={()=>setIsAdding(false)}>Cancel</Button>
                        <Button style={{width:'fit-content', margin:'12px 0'}} variant="contained" onClick={()=>saveSkill()}>Save</Button>
                    </Grid>
                </Grid>
            }
            </Grid>
        </>     
    )
}