import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import React, { useEffect, useState } from 'react';
import "../report-controls.css";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export interface DatePickerProps{
    url?: string;
    sourceEndPoint?: string;
    queryParameter?: string;
    label?: string;
}
export const ReportDatePicker:React.FC<DatePickerProps> = (props: DatePickerProps): JSX.Element => {
    const {url, sourceEndPoint, queryParameter, label} = props;

    const [val, setVal] = useState('');
    return(
        
        <FormControl sx={{ m: 1, minWidth: 160 }}>
           <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DatePicker label='' />
            </LocalizationProvider>
        </FormControl>
    )

}