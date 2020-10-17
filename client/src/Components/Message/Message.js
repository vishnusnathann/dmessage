import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import  "./Message.css";
import Loading from '../Loading/Loading';

const Message = (props) => {

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
		axios.get(`http://localhost:5000/api/messages/get_message?url=${props.match.params.m}`).then(async (res)=>{

            if(!res.data.err){
                if(res.data.urlFlag){
                    window.location.href= await res.data.message;
                    await setLoading(false);
                }
                else{
                    await setMessage(res.data.message);
                    await setLoading(false);
                }
            }
            else{
                await setError(true);
                await setMessage(res.data.message);
                await setLoading(false);
            }

		})
    }, []);

    return (
    <>
        {

            !loading ?

            (!error ?
            <div className="message-box-container">
                <div className="card">
                    <div className="card-header">
                        Message
                    </div>
                    <div className="card-body">
                        {message}
                    </div>
                    <div className="card-footer">
                        With &#128155; DMessage
                    </div >
                </div>
            </div>
            :
            <div className="message-box-container ">
                <div className="card">
                    <div className="card-header error">
                        Oops !!!
                    </div>
                    <div className="card-body">
                        {message}
                    </div>
                </div>
            </div>)
            :
            <Loading/>
        }
    </>
    )
}

export default Message;
