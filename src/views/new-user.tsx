
import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import React, { FormEventHandler, useEffect, useState } from "react";
import './new-user.css'
import axios from "axios";

export const NewUser: React.FunctionComponent = (newUserProps):JSX.Element => {
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const newUser = await axios
        .post(`http://localhost:3001/api/user/signup`, {userEmail, userPassword, userName})
        .catch((err) => {
            alert(err.response.data.message)
        });


    }

    useEffect( () => {
        console.log(process.env);
        console.log(window.location)
    });
    

    return(
    
        <form onSubmit={handleSubmit}>
            <Grid container direction='column' rowGap='12px' style={{paddingTop:'12px'}}>
                <TextField 
                    value={userEmail} 
                    onChange={ (evt)=> setEmail(evt.target.value) }
                    label="User Name"
                    type="email"
                    required
                />
                <TextField
                    type='password' 
                    value={userPassword} onChange={ (evt)=> setPassword(evt.target.value) }
                    label="Password"
                    required
                />
                <TextField
                    value={userName} onChange={ (evt)=> setUserName(evt.target.value) }
                    label="Name"
                    required
                />
                <Button type="submit">Submit</Button>

            </Grid>
        </form>
        
    )
}