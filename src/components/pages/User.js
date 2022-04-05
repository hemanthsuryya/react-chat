import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../requests/helper';
import { checkFriendship,sendFriendRequest} from '../../requests/helper';
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
    <div>
    {user?
    <div>
            {user.username}
            <br/>
            {user.email}
            <br/>
            
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