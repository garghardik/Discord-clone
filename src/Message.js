import { Avatar } from '@mui/material';
import React from 'react';
import "./Message.css";

function Message({timestamp,user,message}) {
  return (
    <div className='message'>
        <Avatar src={user.photo}/>
     <div className='message_info'>
        <h3> 
            {user.displayName}
            <span className='message_timestamp'>
                {new Date(timestamp?.toDate()).toUTCString()}
            </span>
        </h3>
        <p>{message}</p>
     </div>
    </div>
  )
}

export default Message