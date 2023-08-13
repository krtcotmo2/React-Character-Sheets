import { Button, Grid, TextField } from "@mui/material";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, resetPassword } from "../../api/user-api";
import { store } from "../../redux/configure-store";
import { UserActions } from "../../redux/reducers/user-reducer";
import { User } from "../../interfaces/user";
import { showError } from "../modal/business-logic/error-handler";


export const Login: React.FunctionComponent = ():JSX.Element => {
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await loginUser(userEmail, userPassword)
            .then( (user: any) => {
                const mappedUser: User = {
                    name: user.userName,
                    email: user.userEmail,
                    id: user.userID.toString(),
                    authenticated: true,
                }
                store.dispatch(UserActions.setUser(mappedUser));
                navigate(`/main/loadChar`);
            })
            .catch(err => {
                store.dispatch(UserActions.clearUser());
                showError(
                    'log_in_failed',
                    [{key: 'userId', value: 'www'}]
                );
            });
    }
    const resendPassword= (event: any) =>{
        event?.preventDefault();
        resetPassword('kurt@aol.com');
    }
    return (
        <div  className='charList standardList' >
            <p>Login</p>
            <form onSubmit={handleSubmit}>
            <Grid container direction='column' rowGap='12px' style={{paddingTop:'12px'}}>
                <TextField 
                    value={userEmail} 
                    onChange={ (evt)=> setEmail(evt.target.value) }
                    label="Email"
                    type="email"
                    required
                />
                <TextField
                    type='password' 
                    value={userPassword} onChange={ (evt)=> setPassword(evt.target.value) }
                    label="Password"
                    required
                />
                <Button type="submit" variant="contained">Submit</Button>
                {/* <Button type="button" onClick={resendPassword}>Forgot</Button> */}
            </Grid>
        </form>
        </div>
    )
}