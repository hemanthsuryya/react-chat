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