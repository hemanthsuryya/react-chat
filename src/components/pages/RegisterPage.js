import React,{useState} from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import '../../App.css';
import { register } from '../../requests/helper';

export default function SignUpPage() {
    const navigate = useNavigate();
    const [data,setData] = useState({
        username:"",
        email:"",
        password:""
    })
    const handleSubmit = async(evt) => {
        evt.preventDefault();
        let response = await register(data);
        if(response){
            // Send user to Login page...
            localStorage.setItem("username",data.username);
            localStorage.setItem("user",JSON.stringify(response.data));
            navigate("/home",{state:{id:response.data._id}});

        }
        else{
            alert("Register Failed")
        }
      };
    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="first_name" value={data.username} onChange={(e) => setData({...data, username:e.target.value})} required  />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" value={data.email} onChange={(e) => setData({...data, email:e.target.value})} required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" value={data.password} onChange={(e) => setData({...data, password:e.target.value})} required />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Login</Link>.</p>
            </footer>
        </div>
    )

}
