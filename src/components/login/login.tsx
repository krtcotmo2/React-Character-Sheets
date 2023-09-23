import { Button, Grid, TextField } from "@mui/material";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { createNewUser, loginUser, resetPassword, updatePassword } from "../../api/user-api";
import { store } from "../../redux/configure-store";
import { UserActions } from "../../redux/reducers/user-reducer";
import { User } from "../../interfaces/user";
import { showError } from "../modal/business-logic/error-handler";
import { useSelector } from "react-redux";


export const Login: React.FunctionComponent = ():JSX.Element => {
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userVPassword, setVPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [isResetting, setIsResetting] = useState(false);
    const [addingNew, setAddingNew] = useState(false);
    const [isForgotten, setIsForgotten] = useState(false);
    const [subtitle, setSubtitle] = useState('');
    const currentUser: User = useSelector(state => store.getState().user);

    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if(addingNew){
            await newUser(event);
            return;
        }

        if(isForgotten){
            await resendPassword(event);
            return;
        }
        if(isResetting){
            if(userVPassword !== userPassword){
                showError('passwords_dont_match');
                return;
            }
            await updatePassword(currentUser.id.toString(), userPassword, currentUser)
        }
        await loginUser(userEmail, userPassword)
            .then( (user: any) => {
                const mappedUser: User = {
                    name: user.userName,
                    email: user.userEmail,
                    id: user.userID.toString(),
                    authenticated: true,
                    forcedReset: user.forcedReset
                }
                store.dispatch(UserActions.setUser(mappedUser));
                if(mappedUser.forcedReset){
                    setIsResetting(true);
                    setSubtitle('Enter in New');
                    setVPassword('');
                    setPassword('');
                    return;
                }else{
                    navigate(`/main/loadChar`);
                }
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
        resetPassword(userEmail)
            .catch(err => {
                showError('Email not found',[
                    {key:'userEmail', value: userEmail}
                ]);
                return;
            })
            .then(()=> {
                showError('password_reset',);
                resetProcess();
            });
    }
    const newUser = (event: any) =>{
        event?.preventDefault();
        if(userPassword !== userVPassword){
            showError("passwords_dont_match")
            return;
        }
        return createNewUser(userEmail, userPassword, userName)
        .then(arg => {
            showError('user_created',[
                {key:'userName', value: userName}
            ]);
            resetProcess();
        })
        .catch(err => {
            if(err.response.data.message === 'User already exists'){
                showError('user_already_exists',[
                    {key:'userEmail', value: userEmail}
                ]);
                return;
            };
            showError(err.response.data.message);
        });
           
    }
    const resetProcess = () => {
        setAddingNew(false); 
        setIsForgotten(false);
        setSubtitle('');
        setUserName('');
        setPassword('');
    }
    return (
        <div  className='charList standardList' >
            <p>{subtitle} Login</p>
            <form onSubmit={handleSubmit}>
            <Grid container direction='column' rowGap='12px' style={{paddingTop:'12px'}}>
                {!isResetting &&
                    (<TextField 
                            value={userEmail} 
                            onChange={ (evt)=> setEmail(evt.target.value) }
                            placeholder="Email*"
                            type="email"
                            required
                        />)
                }
                {(!isForgotten || isResetting) && 
                    (<TextField
                        type='password' 
                        value={userPassword} 
                        onChange={ (evt)=> setPassword(evt.target.value) }
                        placeholder="Password*"
                        required
                    />)
                }
                { (addingNew  || isResetting) && 
                    (<>
                        <TextField
                            type='password' 
                            value={userVPassword} 
                            onChange={ (evt)=> setVPassword(evt.target.value) }
                            placeholder="Verify Password*"
                            required
                        />
                    </>)
                }
                { addingNew && 
                    (<>
                        <TextField
                            type='text' 
                            value={userName} 
                            onChange={ (evt)=> setUserName(evt.target.value) }
                            placeholder="Your Name*"
                            required
                        />
                    </>)
                }
                
                <Button type="submit" variant="contained">Submit</Button>
                {(!isForgotten && !addingNew && !isResetting) && <Button type="button" style={{background:'white'}} onClick={()=>{setIsForgotten(true); setSubtitle('Reset Lost')}}>Forgot</Button>}
                {!isForgotten && !addingNew && !isResetting &&  <Button variant='outlined' style={{background:'white'}} type="button" onClick={()=>{setAddingNew(true); setSubtitle('Create New')}}>New User</Button>}
                {(isForgotten || addingNew) &&  <Button variant='outlined' style={{background:'yellow'}} type="button" onClick={resetProcess}>Cancel</Button>}
            </Grid>
            </form>
        </div>
    )
}