import React,{useEffect} from 'react';
import { useParams,useLocation } from 'react-router-dom';
import Room from './Room';



function Chat({socket}) {
    const { id } = useParams();
    const {state} = useLocation();
    useEffect(() => {
      // state.socket.emit("joinRoom",id);
      console.log(state,id);
    });
  return (
    <div>Chat
    <Room socket={socket} username={localStorage.getItem("username")} room={id} friend={state.friendName}/>
    </div>
  )
}

export default Chat