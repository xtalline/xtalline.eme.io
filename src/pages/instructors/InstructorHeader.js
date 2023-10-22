import React from "react";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/header.css";

import Avatar from "../../assets/img/male-avatar.png";
//import MaleAvater from "../../assets/img/male-avatar.png";
import AppLogo from "../../assets/img/app-logo.png";

import { FaSearch } from "react-icons/fa";

const InstructorHeader = () => {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };
    const navigateToProfile = () => {
        navigate('/profile');
    };
    return (
        <>
            <div className="header-logo">
                <img alt="LEWIS logo" src={AppLogo} onClick={navigateToHome} onTouchStart={navigateToHome} title="Home" />
            </div>
            <div className="header-search-bar-container">
                <div className="header-search-bar">
                    <FaSearch className="search-ic" />
                    <input type="search" id="search" className="search" name="search" placeholder="Search here" />
                </div>
            </div>
            <div className="header-nav">
                <img className="header-nav-profile"
                    alt="profile avatar"
                    src={Avatar}
                    onClick={navigateToProfile}
                    onTouchStart={navigateToProfile}
                    title="Go to Profile" />
            </div>
        </>
    )
}
export default InstructorHeader;