import React, { useState, useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import { getMessages } from '../../requests/helper';
import './Room.css'

const Room = ({ socket, username, room, friend }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds(),
            }
            var chat = {
                message: messageData.message,
                author: messageData.author,
                time: messageData.time
            }
            await socket.emit("sendMessage", messageData);
            setMessageList((list) => [...list, chat]);
            setCurrentMessage("");
        }
    }
    async function fetchMessages() {
        let res = await getMessages(room);
        // console.log(res);
        if (res.data !== "") {
            setMessageList(res.data.chats);
        }
    }
    useEffect(() => {
        fetchMessages();
    })
    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            // console.log(data);
            var chat = {
                message: data.message,
                author: data.author,
                time: data.time
            }
            setMessageList((list) => [...list, chat]);
            // console.log(messageList);
        })
    }, [socket]);
    return (
        <div className='chat-window'>
            <div className="chat-header">
                <p> {friend}</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent,index) => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.author ? "you" : "other"}
                                key={index}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Room;
