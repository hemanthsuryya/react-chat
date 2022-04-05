import axios from "axios";

const baseURL = "http://localhost:3001";

export const register = async(data)=>{
    let url = `${baseURL}/register`;
    let res = axios.post(url,data).then((response)=>{
        return response;
    })
    return res;
}

export const login = async(data)=>{
    let url = `${baseURL}/login`;
    let res = axios.post(url,data).then((response)=>{
        return response;
    })
    return res;
}

export const getAllFriends = async(username)=>{
    let url = `${baseURL}/features/getAllFriends?username=${username}`;
    let res = axios.get(url).then((response) => {
        return response;
      });
    return res;
}

export const getAllInvitations = async(username)=>{
    let url = `${baseURL}/features/getAllInvitations?username=${username}`;
    let res = axios.get(url).then((response) => {
        return response;
      });
    return res;
}

export const searchUsers = async(username)=>{
    let url = `${baseURL}/features/search?username=${username}`;
    let res = axios.get(url).then((response) => {
        return response;
      });
    return res;
}

export const getUser = async(id)=>{
    let url = `${baseURL}/features/getUser?id=${id}`;
    let res = axios.get(url).then((response) => {
        return response;
      });
    return res;
}


export const checkFriendship = async(username,friend)=>{
    let url = `${baseURL}/features/checkFriendship?username=${username}&friend=${friend}`;
    let res = axios.get(url).then((response) => {
        return response;
      });
    return res;
}

export const sendFriendRequest = async(data)=>{
    let url = `${baseURL}/features/sendFriendRequest`;
    let res = axios.post(url,data).then((response)=>{
        return response;
    })
    return res;
}

export const acceptFriendRequest = async(data)=>{
    let url = `${baseURL}/features/acceptFriendRequest`;
    let res = axios.post(url,data).then((response)=>{
        return response;
    })
    return res;
}