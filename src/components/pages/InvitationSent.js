import React,{useEffect,useState} from 'react'
/* This is importing the functions from the helper file. */
import { getAllSentInvitations } from '../../requests/helper';

function InvitationSent() {
    const [invitationList,setInvitationList] = useState(undefined);
    async function fetchInvitations(){
        let invList = await getAllSentInvitations(localStorage.getItem("username"));
        setInvitationList(invList.data.allpending);
        // console.log(allFriends);
    }
    useEffect(() => {
        /* This is a function that is being called in the useEffect function. This function is fetching
        all of the invitations that have been sent to the user. */
        fetchInvitations();
    }, []);
  return (
    <div>
        {invitationList?
        invitationList.map((item,index)=>(
            /* This is a div that is being rendered for each item in the requestList. The key is the
            index of the item in the list. The border is 1px solid. The username is the username of
            the person who sent the request. The span is a button that says accept. The onClick is a
            function that calls the handleAccept function. */
            <div key={index} style={{border:"1px solid"}} >
                {item.username}
            </div>
        ))
        :null}   
    </div>
  )
}

export default InvitationSent
