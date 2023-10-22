import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./assets/styles/app.css"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Whereabouts from "./pages/Whereabouts";
import Profile from "./pages/Profile";
import Schedule from "./pages/Schedule";
import Header from "./pages/Header";
import supabase from "./config/supabaseClient";

function App() {
    const [token, setToken] = useState(false)
    const [accountStatus, setAccountStatus] = useState("")
    const [account_confirmed_at, setAccountConfirmedAt] = useState("")

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token')
        if (storedToken) setToken(JSON.parse(storedToken))
    }, [])

    useEffect(() => {
        if (token) sessionStorage.setItem('token', JSON.stringify(token))
    }, [token])

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                const { data, error } = await supabase
                    .from('profiles')
                    .select()
                    .eq('id', token.user.id)
                    .single()

                if (error) {

                } else if (data) {
                    setAccountStatus(data.accountStatus)
                    setAccountConfirmedAt(data.account_confirmed_at)
                }
            }
            fetchData()
        }
    }, [token])

    if (token) {
        if (accountStatus && account_confirmed_at && token.user.email_confirmed_at) {
            return (
                <div className="main-wrapper">
                    <div className="header">
                        <Header token={token} />
                    </div>
                    <div className="main-content-wrapper">
                        <Routes>
                            <Route path="/" element={<Whereabouts token={token} />} />
                            <Route path="/*" element={<Profile token={token} />} />
                            <Route path="/schedule" element={<Schedule />} />
                        </Routes>
                    </div>
                </div>)
        } else {
            return (
                <div className="main-wrapper">
                    <div className="header">
                        <Header token={token} />
                    </div>
                    <div className="main-content-wrapper">
                        <Routes>
                            <Route path="/" element={<Whereabouts token={token} />} />
                            <Route path="/*" element={<Profile token={token} />} />
                        </Routes>
                    </div>
                </div>)
        }
    } else if (!token) {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Login setToken={setToken} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        )
    }
    /*return (
        <div className="main-wrapper">
            <div className="header">
                {token &&
                    <Header token={token} />}
            </div>
            <div className="main-content-wrapper">
                <Routes>
                    <Route path="/" element={token ? <Whereabouts token={token} /> : <Navigate to="/login" />} />
                    <Route path="/*" element={token ? <Profile token={token} /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/schedule" element={<Schedule />} />
                </Routes>
            </div>
        </div>
        //<StudentPages/>
        //<DeptHeadPages/>
        //<InstructorPages/>

    )*/
}
export default App;