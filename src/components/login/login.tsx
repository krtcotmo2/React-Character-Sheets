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
    const [userVPassword, setVPassword] = useState('');
    const [addingNew, setAddingNew] = useState(false);
    const [isForgotten, setIsForgotten] = useState(false);
    const [subtitle, setSubtitle] = useState('');
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
    const newUser = (event: any) =>{
        event?.preventDefault();
        console.log('Add new User')
    }
    const resetProcess = () => {
        setAddingNew(false); 
        setIsForgotten(false);
        setSubtitle('');
    }
    return (
        <div  className='charList standardList' >
            <p>{subtitle} Login</p>
            <form onSubmit={handleSubmit}>
            <Grid container direction='column' rowGap='12px' style={{paddingTop:'12px'}}>
                <TextField 
                    value={userEmail} 
                    onChange={ (evt)=> setEmail(evt.target.value) }
                    placeholder="Email*"
                    type="email"
                    required
                />
                {!isForgotten && 
                (<TextField
                    type='password' 
                    value={userPassword} 
                    onChange={ (evt)=> setPassword(evt.target.value) }
                    placeholder="Password*"
                    required
                />)
                }
                { addingNew && 
                    (<TextField
                        type='password' 
                        value={userVPassword} 
                        onChange={ (evt)=> setVPassword(evt.target.value) }
                        placeholder="Verify Password*"
                        required
                    />)
                }
                
                <Button type="submit" variant="contained">Submit</Button>
                {(!isForgotten && !addingNew) && <Button type="button" style={{background:'white'}} onClick={()=>{setIsForgotten(true); setSubtitle('Recover Lost')}}>Forgot</Button>}
                {!isForgotten && !addingNew &&  <Button variant='outlined' style={{background:'white'}} type="button" onClick={()=>{setAddingNew(true); setSubtitle('Create New')}}>New User</Button>}
                {(isForgotten || addingNew) &&  <Button variant='outlined' style={{background:'yellow'}} type="button" onClick={resetProcess}>Cancel</Button>}
            </Grid>
        </form>
        </div>
    )
}