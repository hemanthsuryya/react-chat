import React,{useState,useEffect} from 'react';
import { getMessages } from '../../requests/helper';
import './Room.css'
const Room = ({socket,username,room}) => {
    const [currentMessage,setCurrentMessage] = useState("");
    const [messageList,setMessageList ] = useState([]);

    const sendMessage = async () =>{
        if(currentMessage !==""){
            const messageData = {
                room: room,
                author: username,
                message:currentMessage,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":"+new Date(Date.now()).getSeconds(),
            }
            var chat  = {
                message:messageData.message,
                author:messageData.author,
                time:messageData.time
              }
            await socket.emit("sendMessage",messageData);
            setMessageList((list)=>[...list,chat]);
            setCurrentMessage("");
        }
    }
    async function fetchMessages() {
        let res = await getMessages(room);
        // console.log(res);
        if(res.data!=""){
            setMessageList(res.data.chats);
        }
    }
    useEffect(()=>{
        fetchMessages();
    },[])
    useEffect(() => {
        socket.on("receiveMessage",(data)=>{
            // console.log(data);
            var chat  = {
                message:data.message,
                author:data.author,
                time:data.time
              }
            setMessageList((list)=>[...list,chat]);
            // console.log(messageList);
        })
    }, [socket]);
    return (
        <div className='card'>
            <div>
            <h1 className='text-center'> Live {username}</h1>
            </div>
            <div className="body">
                {messageList?messageList.map((item,index)=>(
                    <div key={index}>
                        <div className="msg" style={{display:"flex"}}>
                            <h2 >{item.author} </h2>
                            <h4 >{item.message}</h4>
                            <h6 > {item.time}</h6>
                        </div>
                    </div>
                )):null}
            </div>
            <div className='message-sender'>
                <input type="text" placeholder="Hey.." value={currentMessage} onChange={(e)=>{
                    setCurrentMessage(e.target.value);
                }}/>
                <button onClick={sendMessage}>Send Message</button>
            </div>
        </div>
    );
}

export default Room;
