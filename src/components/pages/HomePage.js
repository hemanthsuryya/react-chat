import React, { useState, useEffect } from 'react';
import { searchUsers } from '../../requests/helper';
import { useNavigate, useLocation } from "react-router-dom";
import { v5 } from 'uuid';
import { getAllFriends } from '../../requests/helper';
import aajtk from "../../images/Aaj_Tak_logo.png";
import star from "../../images/Star_Sports_India_logo1.png";
import sonyp from "../../images/Sony_pal.png";
import xm from "../../images/9XMHindiMusicTelevisionChannelLogo.jpg";
import sport from "../../images/StarPlus_Logo.png";
import './HomePage.css';

export default function HomePage({ socket }) {
    const bio = [
        {
            name:"Aaj Tak",
            logo:aajtk
        },
        {
            name:"Star Plus",
            logo:star
        },
        {
            name:"Sony Pal",
            logo:sonyp
        },
        {
            name:"9XM",
            logo:xm
        },
        {
            name:"Stat Sports",
            logo:sport
        },
    ]
    const [search, setSearch] = useState('');
    const [isOnline,setIsOnline] = useState({});
    const [searchedList, setSearchedList] = useState(undefined);
    const [allFriends, setAllFriends] = useState(undefined);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const navigate = useNavigate();
    const { state } = useLocation();
    const handleChange = async (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            setSearchedList(undefined);
        }
        else {
            let response = await searchUsers(e.target.value);
            console.log(response)
            setSearchedList(response.data);
        }
    }
    async function fetchFriends() {
        let allfriends = await getAllFriends(localStorage.getItem("username"));
        let allFriendsList = allfriends.data.friendList;
        for(let i=0; i<allFriendsList.length; i++){
            allFriendsList[i]["bio"] = bio[Math.floor(Math.random() * bio.length)];
        }
        // console.log(allFriendsList);
        setAllFriends(allFriendsList);
        
        socket.emit("getStatus");
    }
    useEffect(() => {
        let userId = JSON.parse(localStorage.getItem("user"))._id;
        socket.emit("login", { id: userId });
        fetchFriends();
    }, []);
    async function setStatus() {
        socket.on("userStatus", async (data) => {
            console.log("Called this")
            let onlineIds = Object.values(data);
            setOnlineFriends(onlineIds);
            let allfriends = await getAllFriends(localStorage.getItem("username"));
            let allFriendsList = allfriends.data.friendList;
            let status  = {}
            for(let i=0; i<allFriendsList.length; i++){
                if(onlineIds.includes(allFriendsList[i]._id)){
                    status[allFriendsList[i]._id] = true;
                }
                else{
                    status[allFriendsList[i]._id] = false;
                }
            }
            setIsOnline(status);
        })
    }
    useEffect(() => {
        setStatus();
    },[socket]);
    function handleClick(id) {
        navigate(`/user/${id}`)
    }
    function handleChat(friendName) {
        const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
        var me = v5(localStorage.getItem("username"), MY_NAMESPACE);
        var friend = v5(friendName, MY_NAMESPACE);
        var uniqueId = [me, friend].sort().join('-')
        navigate(`/chatroom/${uniqueId}`, { state: { friendName: friendName } })
    }
    const handleReqClick = () => {
        navigate('/request')
    }
    return (

        <div className='card'>

            <div className="text-center">
                <h1 className="home-page-title">Friends</h1>
            </div>
            <div className="func-area">


                <div className="search-div">
                    <input type="text" id="search" autoComplete='off' placeholder={'Search for friends'} value={search} style={{ border: "1px solid" }} onChange={(e) => handleChange(e)} />
                    {searchedList ? searchedList.map((item, index) => (
                        <div key={index}>
                            <img src="https://www.vhv.rs/dpng/d/421-4211266_simple-user-icon-user-icon-clipart-hd-png.png" alt="friend" />
                            <button className='search-list-item' onClick={() => handleClick(item._id)}>{item.username}</button>
                        </div>
                    )) : null}
                </div>

            </div>
            <div className="chats-list">
                <ul id="friend-list">
                    {allFriends ?
                        allFriends.map((item, index) => (
                            <li key={index} className="friend" onClick={() => handleChat(item.username)}>
                                <div className='icon-container'>
                                    <img className='friend-img' src="https://www.vhv.rs/dpng/d/421-4211266_simple-user-icon-user-icon-clipart-hd-png.png" alt="friend" />
                                    {isOnline[item._id]?<div className='online-status-circle'>
                                    </div>
                                    :
                                    <div className='offline-status-circle'>
                                    </div>
                                    }
                                </div>
                                <div className="name">{item.username}
                                </div>
                                
                                <img className='channel-img' src={item.bio.logo} alt={item.bio.name} />
                            </li>
                        ))
                        : null}

                </ul>
            </div>
            <button className="request-btn-div" onClick={handleReqClick}>Invitation Received</button>
        </div>

    )
}
