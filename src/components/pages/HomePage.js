import React,{useState,useEffect} from 'react';
import { searchUsers } from '../../requests/helper';
import { useNavigate } from "react-router-dom";

import { getAllFriends } from '../../requests/helper';

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
    const handleChat = () =>{
        console.log("go to Chat Page")
    }
    const handleReqClick = () =>{
        navigate('/request')
    }
    return (
        <div>
            <div>
                Search:<input type="text" id="search" value={search} style={{border:"1px solid"}} onChange={(e)=>handleChange(e)}/>
                {searchedList? searchedList.map((item,index)=>(
                    <div key={index}>
                        <button onClick={()=>handleClick(item._id)}>{item.username}</button>
                    </div>
                )):null}
            </div>
            <div className="text-center">
                <h1 className="home-page-title">Chat</h1>
            </div>
            <button onClick={handleReqClick}>Request Received</button>
            <div>
                {allFriends?
                allFriends.map((item,index)=>(
                    <div key={index} style={{border:"1px solid"}} onClick={handleChat}>
                        {item.username}
                    </div>
                ))
                :null}    
            </div>
        </div>

    )
}
