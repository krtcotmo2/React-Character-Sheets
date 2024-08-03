import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configure-store';
import { CollapsibleRow } from '../../components/collapsible-row/collapsible-row';
import { Character } from '../../interfaces/character';
import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Armor, ArmorGrouping, ArmorSet } from '../../interfaces/armor';
import { createArmorGrouping, getCharacterArmor } from '../../api/armor-api';
import { Stat } from '../../interfaces/stat';
import { Link } from 'react-router-dom';
import { ArmorActions } from '../../redux/reducers/armor-reducer';
import { WHATISMOD } from '../../enum/what-is-mod-type';
import { ReportDropDown } from './components/drop-down';
import { ReportDatePicker } from './components/date-picker';
import { reportParams } from './data/reprts-params';

export interface ReportParameters{
    type: string;
    label: string;
    endPoint: string;
}
export interface ReportProps{

}
export const Reports:React.FC<ReportProps> = (props: ReportProps): JSX.Element => {
    
    // const [acName, setAcName] = useState('');
    // const [acOrder, setAcOrder] = useState(0);
    // const [isAdding, setIsAdding] = useState(false);
    // const [armors, setArmors] = useState<ArmorSet[]>([]);
    // const char: Character = useSelector(state => store.getState().character);
    // const stats: Stat = useSelector(state => store.getState().stats);

    const [params, setParams] = useState<ReportParameters[]>([]);
    const [reportName, setReportName] = useState('');
   
    
    
    const buildParamComponent = (p: ReportParameters, i : number) => {
        if(p.type==='dropdown'){
            return (<ReportDropDown label={p.label} key={`dd${i}`} sourceEndPoint={p.endPoint}/> )
        }else if(p.type==='calendar'){
            return (<ReportDatePicker label={p.label} key={`dd${i}`}/> )
        }

    }
    

    const doChange = async (evt: SelectChangeEvent) => {
        await setParams([]);
        const selectedReport = Object.entries(reportParams).find(
            ([key]) => key === evt.target.value
        )?.[1] || {params:[]};
        setParams(selectedReport.params);
        setReportName(evt.target.value);
    }
    return (   
        <>
            <Grid container direction="row" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
                <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <InputLabel id="demo-simple-select-disabled-label" style={{backgroundColor:"#dfd9c9"}}>Select Report</InputLabel>
                    <Select 
                        autoWidth
                        value={reportName}
                        onChange={(event)=>doChange(event)}
                        >
                        <MenuItem value={''}></MenuItem>
                        <MenuItem value={'rpt1'}>Report 1</MenuItem>
                        <MenuItem value={'rpt2'}>Report 2</MenuItem>
                        <MenuItem value={'rpt3'}>Report 3</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid container direction="row" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
                {params.length > 0 &&
                    params.map( (p, i) => buildParamComponent(p,i))
                }
                {params.length > 0 && (<Button variant='outlined' >Submit</Button>)}
            </Grid>
            <Grid container direction="column" justifyContent={"center"} style={{ fontSize: "18px" }} className="standardList">
                <h1>Report Results</h1>
            </Grid>
        </>     
    )
}