import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../requests/helper';
import { checkFriendship,sendFriendRequest} from '../../requests/helper';
import './User.css'
function User() {
    const { id } = useParams();
    const [user,setUser] = useState(undefined);
    const [isFriend,setIsFriend] = useState(false);
    const [postReqMessage,setPostReqMessage] = useState(false);
    async function fetchFriendShip(username,friend) {
        let flag = await checkFriendship(username,friend);
        setIsFriend(flag.data.isFriend);
    }
    async function fetchUser(id) {
        let res = await getUser(id);
        setUser(res.data);
        let username = localStorage.getItem("username");
        fetchFriendShip(username,res.data.username)
    }

    async function handleRequestClick(friendName){
        let username = localStorage.getItem("username");
        let body ={
            userName:username,
            userFriendName:friendName
        }
        console.log(body);
        await sendFriendRequest(body);
        setPostReqMessage(true);
    }
    
    useEffect( () => {
        fetchUser(id)
    }, []);
  return (
    <div className='card'>
    {user?
    <div className='profile-card'>
            <img src="https://www.vhv.rs/dpng/d/421-4211266_simple-user-icon-user-icon-clipart-hd-png.png" alt='user'/>
            <br/>
            <div className='username-label'>
                    {user.username}
            </div>
            <div className='email-label'>
            {user.email}
            </div>
            
                {isFriend
                ?
            <button>Chat</button>
            :
             postReqMessage?
                        "Request Sent":
                <button onClick={()=>handleRequestClick(user.username)}>SendFriendRequest</button> 
                
} 
            </div>
    :null
    }
    </div>
  )
}

export default User