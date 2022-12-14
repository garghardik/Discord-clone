import {React,useState,useEffect} from 'react'
import "./Chat.css"
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';
import firebase from 'firebase/compat/app';

function Chat() {

  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const[input,setinput]=useState("");
  const[messages,setMessages]=useState([]);

  useEffect(()=>{
    if(channelId){
      db.collection('channels')
      .doc(channelId)
      .collection('messages')
      .orderBy('timestamp','desc')
      .onSnapshot(snapshot=>(
        setMessages(snapshot.docs.map(doc=>doc.data()))
    ));
    }
    
  },[channelId]);

  const sendMessage=event=>{
    event.preventDefault();
    db.collection('channels').doc(channelId).collection('messages').add({
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      message:input,
      user:user
    });
    setinput("");
  };

  return (
    <div className='chat'>
        <ChatHeader channelName={channelName}/>
      <div className='chat_messages'>
        {messages.map((message) => (
          <Message
          key={message.id}
          timestamp={message.timestamp}
          message={message.message}
          user={message.user}
          />
        ))}
      </div>
      <div className='chat_input'>
        <AddCircleIcon fontSize="large"/>
        <form>
          <input 
            value={input}
            disabled={!channelId} 
            onChange={e=>setinput(e.target.value)}
            placeholder={`Message #${channelName}`}/>
          <button 
            disabled={!channelId}
            className="chat_inputButton" 
            type='submit'
            onClick={sendMessage}
            > Send message
          </button>
        </form>
        <div className="chat_inputicons">
          <CardGiftcardIcon fontSize='large'/>
          <GifIcon fontSize='large'/>
          <EmojiEmotionsIcon fontSize='large'/>
        </div>
      </div>
    </div>
  )
}

export default Chat