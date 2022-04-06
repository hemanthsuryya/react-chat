import React,{useState,useEffect} from 'react';
import { searchUsers } from '../../requests/helper';
import { useNavigate } from "react-router-dom";
import { v5 } from 'uuid';
import { getAllFriends } from '../../requests/helper';
import './HomePage.css';

export default function HomePage() {

    const [search,setSearch] = useState('');
    const [searchedList,setSearchedList] = useState(undefined);
    const [allFriends,setAllFriends] = useState(undefined);
    const navigate = useNavigate();
 
    const handleChange = async(e) =>{
        setSearch(e.target.value);
        if(e.target.value==""){
            setSearchedList(undefined);
        }
        else{
            let response = await searchUsers(e.target.value);
            console.log(response)
            setSearchedList(response.data);
        }
    }
    async function fetchFriends(){
        let allFriends = await getAllFriends(localStorage.getItem("username"));
        // console.log(allFriends);
        setAllFriends(allFriends.data.friendList);
    }
    useEffect(() => {
        fetchFriends();
    }, []);
    function handleClick(id){
        navigate(`/user/${id}`)
    }
    function handleChat(friendName){
        const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
        var me = v5(localStorage.getItem("username"),MY_NAMESPACE);
        var friend = v5(friendName,MY_NAMESPACE);
        var uniqueId = [me,friend].sort().join('-')
        navigate(`/chatroom/${uniqueId}`)
    }
    const handleReqClick = () =>{
        navigate('/request')
    }
    return (
        
        <div className='card'>
            
            <div className="text-center">
                <h1 className="home-page-title">Chat</h1>
            </div>
            <div className="func-area">

            
            <div className="search-div">
                <input type="text" id="search" placeholder={'Search for friends'} value={search} style={{border:"1px solid"}} onChange={(e)=>handleChange(e)}/>
                {searchedList? searchedList.map((item,index)=>(
                    <div key={index}>
                        <button className='search-list-item' onClick={()=>handleClick(item._id)}>{item.username}</button>
                    </div>
                )):null}
            </div>

            <button className="request-btn-div" onClick={handleReqClick}>Request Received</button>
            
            </div>
            <div>
                {allFriends?
                allFriends.map((item,index)=>(
                    
                    <div  key={index}  onClick={()=>handleChat(item.username)}
                        
                    >
                        {item.username}
                    </div>
                ))
                :null}    
            </div>
        </div>

    )
}
