import React from 'react';
import './Register.css';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'; 
import { useState } from 'react';

import axios from'axios';


const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const registerNew = (e) =>{

        e.preventDefault();
        if(password !== confirmPassword ){
            alert("Password mismatch",password,confirmPassword);
            console.log(password,confirmPassword)
        }
        else{
            axios.post(`http://127.0.0.1:5000/api/users/register`,{username:username,password:password}).then(res=>{
                if(res.data.success)
                window.location.href="/login";
            })
        }
    
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={(e)=>{registerNew(e)}}>
                <h2>Register</h2>
                <TextField
                    label="username"
                    type="email"
                    onChange = {(e)=>{setUsername(e.target.value)}}
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    required
                />
                <TextField
                    label="password"
                    type="password"
                    onChange = {(e)=>{setPassword(e.target.value)}}
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    required
                />
                <TextField
                    label="Confirm password"
                    type="password"
                    onChange = {(e)=>{setConfirmPassword(e.target.value)}}
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    required
                    
                />
                <input  type="submit"/>
            </form>
        </div>
    )
}

export default Register;
