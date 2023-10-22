import React, { useState } from "react";

import "../assets/styles/app.css";
import "../assets/styles/login-register.css";

import LoginDecorBuilding from "../assets/svg/login-decor-building.svg";
import LoginDecorLogo from "../assets/img/app-logo.png";
import bcrypt from "bcryptjs"
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate('/register');
    }


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        if (!email || !password) {
            return

        } else {
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('email', email)
                .single()

            if (data.email && (data.usertype === "student" || data.usertype === "instructor" || data.usertype === "chairperson")) {
                if (bcrypt.compareSync(password, data.password)) {
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email: email,
                        password: password,
                    });
                    if (data) {
                        console.log('success')
                        console.log(data)
                        setToken(data);
                        window.location.reload()
                    } else if (error) {
                        console.log('error')
                    }
                } else {
                    console.log("password is incorrect!")
                }
            } else {
                console.log("user does not exist!")
            }
        }
    }
    return (
        <div className="main-wrapper">
            <div className="login-register-wrapper">
                <div className="login-decoration">
                    <div className="decor-texts">
                        <h1>Whereabouts Locator</h1>
                        <p>LEWIS: Instructors' Whereabouts Embedded Locator System</p>
                    </div>
                    <img src={LoginDecorBuilding} alt="City at night" className="decor-top" />
                    <img src={LoginDecorLogo} alt="Logo of LEWIS" className="decor-bot" />
                </div>

                <div className="login-field-wrapper">
                    <div className="login-form">
                        <div className="login-decoration mobile">
                            <div className="decor-texts">
                                <h1>Whereabouts Locator</h1>
                            </div>
                            <img src={LoginDecorLogo} alt="Logo of LEWIS" />
                        </div>
                        <form onSubmit={handleLogin}>
                            <input type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </form>
                        <div className="login-footer">
                            <div className="recovery-link-wrapper">
                                <a href="#" className="recovery-link">Forgot Password?</a>
                            </div>
                            <button className="login-btn" onClick={handleLogin}><h2>Log In</h2></button>
                            <button className="create-acc-btn"
                                onClick={navigateToRegister}>
                                <h3>Create new account</h3>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;