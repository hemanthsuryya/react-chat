import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import HomePage from './components/pages/HomePage'
import User from './components/pages/User'
import RequestsRec from './components/pages/RequestsRec'
import Chat from './components/pages/Chat'
import InvitationSent from './components/pages/InvitationSent'
import ErrorPage from './components/pages/ErrorPage'
import './App.css'
import io from "socket.io-client";
import RequireAuth from './components/pages/RequireAuth'
import Logout from './components/pages/Logout'
import Authenticated from './components/pages/Authenticated'
const socket = io.connect("http://localhost:3001");


export default function App() {
    return (
        <Router>
            <div>
                <div className="nav">
                    <input type="checkbox" id="nav-check" />
                    <div className="nav-header">
                        <div className="nav-title">
                            E-Chat
                        </div>
                    </div>
                    <div className="nav-btn">
                        <label htmlFor="nav-check">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>

                    <div className="nav-links">
                        <Link to="/home">Home</Link>
                        <Link to="/request">InvitationReceived</Link>
                        <a
                            onClick={() => {
                                socket.emit("logout");
                                Logout();
                            }}
                        >
                            Logout
                        </a>
                    </div>
                </div>
                <Routes>
                    <Route element={<Authenticated />}>
                        <Route exact path="/" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>
                    {/* <Route path="/forget-password" element={ ForgetPasswordPage } /> */}
                    <Route element={<RequireAuth />}>
                        <Route path="/home" element={<HomePage socket={socket} />} />
                        <Route path="/user/:id" element={<User />} />
                        <Route path="/request" element={<RequestsRec />} />
                        <Route path="/invitation" element={<InvitationSent />} />
                        <Route path="/chatroom/:id" element={<Chat socket={socket} />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
        </Router>
    )
}
