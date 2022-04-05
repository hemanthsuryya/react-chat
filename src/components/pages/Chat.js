import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Room from './Room';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");


function Chat() {
    const { id } = useParams();

    useEffect(() => {
        socket.emit("joinRoom",id);
    }, []);
  return (
    <div>Chat
    <Room socket={socket} username={localStorage.getItem("username")} room={id}/>
    </div>
  )
}

export default Chat