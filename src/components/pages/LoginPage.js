import React,{useState} from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import '../../App.css'
import { login } from '../../requests/helper';
export default function SignInPage() {
    const navigate = useNavigate();
    const [data,setData] = useState({
        username:"",
        password:""
    })
    const handleSubmit = async(evt) => {
        evt.preventDefault();
        let response = await login(data);
        if(response){
            // Send user to Login page...
            localStorage.setItem("username",data.username);

            navigate("/home")
        }
        else{
            alert("Login Failed")
        }
      };

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="username" value={data.username} onChange={(e) => setData({...data, username:e.target.value})} required />
                </p>
                <p>
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password" value={data.password} onChange={(e) => setData({...data, password:e.target.value})} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                {/* <p><Link to="/">Back to Homepage</Link>.</p> */}
            </footer>
        </div>
    )
}
