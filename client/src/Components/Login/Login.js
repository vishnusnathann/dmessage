import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'; 
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {

    const authContext = useContext(AuthContext);
    const { login, error, clearErrors, isAuthenticated } = authContext;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        if (isAuthenticated) {
			props.history.push('/');
        }
    }, [props.history,isAuthenticated]);

    const onLogin = (e) =>{
        e.preventDefault();
        login({
            username,
            password,
        })
    }


    return (
        <div className="login-container">
            <form className="login-form" onSubmit={(e)=>onLogin(e)}>
                <h2>Login</h2>
                <TextField
                    label="username"
                    type="email"
                    autoComplete="current-password"
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    required
                    onChange = {(e)=>{setUsername(e.target.value)}}
                />
                <TextField
                    label="password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    required
                    onChange = {(e)=>{setPassword(e.target.value)}}
                />
                <input  type="submit" />
            </form>
            <Link to="/register" value="submit"><span>New? Register here</span></Link> 
        </div>
    )
}

export default Login
