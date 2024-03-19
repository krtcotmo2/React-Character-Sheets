import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import React, { useEffect, useState } from 'react';
import "../report-controls.css";
import { getOptions } from '../logic/api';

export interface DropDownSource{
    url?: string;
    sourceEndPoint?: string;
    queryParameter?: string;
    label: string;
}
export const ReportDropDown:React.FC<DropDownSource> = (props: DropDownSource): JSX.Element => {
    const {url, sourceEndPoint, queryParameter, label} = props;

    const [val, setVal] = useState('');
    const [options, setOptions] = useState<{val: string, txt: string}[]>([]);


    useEffect(()=>{
      setVal('');
        getOptions(sourceEndPoint || '').then(data => {
            setOptions(data);
        }) 
    },[]);
    return(
        
        <FormControl sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="demo-simple-select-disabled-label">{label}</InputLabel>
            <Select 
                label={label}
                placeholder={label}
                autoWidth
                value={val}
                onChange={(evt)=>setVal(evt.target.value)}
                className='leftAlign'
                >
                    {
                        options.map( o => {
                           return(<MenuItem value={o.val}>{o.txt}</MenuItem>);
                        })
                    }
            </Select>
        </FormControl>
    )

}