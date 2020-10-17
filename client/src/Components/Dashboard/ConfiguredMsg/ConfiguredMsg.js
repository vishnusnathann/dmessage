import React from 'react';
import './ConfiguredMsg.css';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export const ConfiguredMsg = (props) => {
    
    return (
        <div className="configured-mgs-container">
            {
                props.messages.map((msgItem,index)=>{
                    return(
                        <div className="message" key={index}>
                            <span className="message-url">{msgItem.message}</span>
                            <span><a href={window.location.href+msgItem.url} target="_blank">{window.location.href+msgItem.url}</a></span>
                            <span><b>{msgItem.clicks}</b> Clicks</span>
                            {
                                dayjs().isBefore(dayjs(msgItem.expiration)) ?
                                    <span className="live">Live</span>
                                    :
                                    <span className="expired">Expired</span>
                            }
                            
                            
                        </div>
                    )
                })
            }
        </div>
    )
}
