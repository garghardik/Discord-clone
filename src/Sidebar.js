import {React,useState,useEffect} from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import {Avatar} from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth, collection, addDoc,onSnapshot } from "./firebase";

function Sidebar() {
    const user  = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const query = collection(db, "channels");
        onSnapshot(query, (snapshot) =>
          setChannels(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              channel: doc.data()
            }))
          )
        );
      }, []);

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");
    
        if (channelName) {
          addDoc(collection(db, "channels"), {
            channelName: channelName
          });
        }
      };

  return (
    <div className="sidebar">
        <div className='sidebar_top'>
            <h3>DISCORD CLONE</h3>
            <ExpandMoreIcon/>
        </div>
        <div className='sidebar_channels'>
            <div className='sidebar_channelHeader'>
                <div className='sidebar_header'>
                    <ExpandMoreIcon/>
                    <h4>Text channels</h4>
                </div>
            <AddIcon onClick={handleAddChannel} className='sidebar_addchannel'/>
            </div>
            <div className="sidebar_channelslist">
                {channels.map(({id, channel})=> (
                 <SidebarChannel 
                 key={id} 
                 id={id} 
                 channelName={channel.channelName}
                 />
                ))}
            </div>
        </div>

        <div className='sidebar_voice'>
            <SignalCellularAltIcon 
            className='sidebar_voiceicon'
            fontSize='large'
            />
            <div className='sidebar_voiceinfo'>
                <h3>Voice connected</h3>
                <p>Stream</p>
            </div>
            <div className='sidebar_voiceIcons'>
                <InfoIcon/>
                <CallIcon/>
            </div>
        </div>
        <div className='sidebar_profile'>
            <Avatar onClick={() => {auth.signOut()} } src={user.photo}/>
            <div className='sidebar_profileinfo'>
                <h3>{user.displayName}</h3>
                <p>#{user.uid.substring(0,5)}</p>
            </div>
            <div className='sidebar_profileicons'>
                <MicIcon/>
                <HeadsetIcon/>
                <SettingsIcon/>
            </div>
        </div>
    </div>
  )
}

export default Sidebar