import React,{useEffect,useState} from 'react'
import { getAllInvitations,acceptFriendRequest } from '../../requests/helper';

function RequestsRec() {
    const [requestList,setRequestList] = useState(undefined);
    async function fetchRequests(){
        let requestList = await getAllInvitations(localStorage.getItem("username"));
        setRequestList(requestList.data.allinvitation);
        // console.log(allFriends);
    }
    useEffect(() => {
        fetchRequests();
    }, []);
    
    async function handleAccept(friendName){
        let username = localStorage.getItem("username");
        let body ={
            userName:username,
            userFriendName:friendName
        }
        console.log(body)
        await acceptFriendRequest(body);
    }
  return (
    <div>
        {requestList?
        requestList.map((item,index)=>(
            <div key={index} style={{border:"1px solid"}} >
                {item.username} : <span style={{border:"solid 1px",backgroundColor:"red"}} onClick={()=>handleAccept(item.username)}>Accept</span>
            </div>
        ))
        :null}   
    </div>
  )
}

export default RequestsRec