import React, { useEffect, useContext, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import './Dashboard.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { ConfiguredMsg } from './ConfiguredMsg/ConfiguredMsg';
import axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loading from '../Loading/Loading';

const Dashboard = () => {
    const authContext = useContext(AuthContext);
	const { isAuthenticated,loading,user,logout} = authContext;

	const [messages, setMessages] = useState(["loading"]);

	const [type, setType] = useState(false);
	const [duration, setDuration] = useState(1);
	const [newGeneratedMsg, setNewGeneratedMsg] = useState("");
	const [copied, setCopied] = useState(false);
	const [messageParameter, setMessageParameter] = useState("");

	useEffect(() => {
		authContext.loadUser();
		if(user){	
			axios.get(`http://localhost:5000/api/messages/get_message_by_user?username=${user}`).then((res)=>{
				setMessages(res.data.reverse());
			})
		}
	}, [loading,user]);
	
	const generateMessage = () =>{
		if(messageParameter !== ""){
			let data = {
				message:messageParameter,
				username: user,
				urlFlag: type,
				expTime: duration
			}
			axios.post('http://localhost:5000/api/messages/add',data).then(res=>{

				setNewGeneratedMsg(window.location.href+res.data.url);
				setCopied(false);
				axios.get(`http://localhost:5000/api/messages/get_message_by_user?username=${user}`).then((res)=>{
					setMessages(res.data.reverse());
				})
            })
		}
	}

    
	if (isAuthenticated && !loading) {
		return (
			<div className="dashboard-container">
				<nav>
					<h1>DMessage</h1>
					<span className="logout" onClick={()=>logout()}>Logout</span>
				</nav>
				<div className="url-box">
				<div className="select-box-container">
					<div className="select-box">
						<FormControl variant="outlined" >
							<InputLabel id="simple-select-outlined-label">Type</InputLabel>
							<Select
							labelId="simple-select-outlined-label"
							id="simple-select-outlined"
							size="small"
							value={type}
							onChange={(e)=>{setType(e.target.value);setMessageParameter("")}}
							label="Type"
							>
							<MenuItem value={false}>Message</MenuItem>
							<MenuItem value={true}>URL</MenuItem>

							</Select>
						</FormControl>
					</div>

					<div className="select-box">
						<FormControl variant="outlined">
							<InputLabel id="simple-select-outlined-label">Duration</InputLabel>
							<Select
							labelId="simple-select-outlined-label"
							id="simple-select-outlined"
							size="small"
							value={duration}
							onChange={(e)=>{setDuration(e.target.value)}}
							label="Duration"
							>
							<MenuItem value={1}>1 Minute</MenuItem>
							<MenuItem value={5}>5 Minute</MenuItem>
							<MenuItem value={15}>15 Minute</MenuItem>
							<MenuItem value={30}>30 Minute</MenuItem>
							<MenuItem value={60}>1 hour</MenuItem>
							</Select>
						</FormControl>
					</div>

				</div>				
				<input type="text" placeholder="Add message" onChange={(e)=>setMessageParameter(e.target.value)}/>
				</div>
				<div className="generate-msg">

					{
						newGeneratedMsg !== "" ?
							<div className="new-generated-mgs">
								<a href={newGeneratedMsg}>{newGeneratedMsg}</a>
								<CopyToClipboard text={newGeneratedMsg}  onCopy={() =>setCopied(true) }>
									<AssignmentIcon></AssignmentIcon>
								</CopyToClipboard>
								{ copied ? <span>Copied</span> : null }
							</div>
							:
							null
					}
					<Button variant="contained" size="large" style={{width:"150px"}}  color="primary" onClick={()=>{generateMessage()}}>
						Generate
					</Button>
				</div>
				<div className="configured-mgs"> 
					{
						messages[0] !== "loading" ?
						<ConfiguredMsg messages={messages}/>
						:

						<span style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"1rem"}}>
							<CircularProgress/>
						</span>

					}

				</div>
			</div>
		);
	} else {
		return <Loading/>;
	}
}

export default Dashboard;
