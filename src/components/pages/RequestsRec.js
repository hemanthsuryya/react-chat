import React,{useEffect,useState} from 'react'
/* This is importing the functions from the helper file. */
import { getAllInvitations,acceptFriendRequest } from '../../requests/helper';

function RequestsRec() {
    const [requestList,setRequestList] = useState(undefined);
    async function fetchRequests(){
        let requestList = await getAllInvitations(localStorage.getItem("username"));
        setRequestList(requestList.data.allinvitation);
        // console.log(allFriends);
    }
    useEffect(() => {
        /* This is a function that is being called in the useEffect function. This function is fetching
        all of the invitations that have been sent to the user. */
        fetchRequests();
    }, []);
    
    async function handleAccept(friendName){
        let username = localStorage.getItem("username");
        /* This is the body of the request. It is sending the username and friendname to the server. */
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
            /* This is a div that is being rendered for each item in the requestList. The key is the
            index of the item in the list. The border is 1px solid. The username is the username of
            the person who sent the request. The span is a button that says accept. The onClick is a
            function that calls the handleAccept function. */
            <div key={index} style={{border:"1px solid"}} >
                {item.username} : <span style={{border:"solid 1px",backgroundColor:"red"}} onClick={()=>handleAccept(item.username)}>Accept</span>
            </div>
        ))
        :null}   
    </div>
  )
}

export default RequestsRec