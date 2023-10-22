import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/header.css";
import "../../assets/styles/dropdown.css";
import "../../assets/styles/notif-badge.css";

import Avatar from "../../assets/img/male-avatar.png";
//import MaleAvater from "../../assets/img/male-avatar.png";
import AppLogo from "../../assets/img/app-logo.png";
import DropdownNotif from "../../components/DropdownNotif";

import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

const DeptHeader = () => {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };
    const navigateToProfile = () => {
        navigate('/profile');
    };


    //Dropdown Notification
    const [dropDownNotif, setDropDownNotif] = useState(false);
    let notifRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!notifRef.current.contains(e.target)) {
                setDropDownNotif(false);
                console.log(notifRef.current);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });

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
            <div className="header-nav" >
                <div className="dropdown-notif" ref={notifRef}>
                    <IoNotifications className="header-nav-ic" size={25}
                        onClick={() => { setDropDownNotif(!dropDownNotif) }}
                    />
                    <div className="notif-badge">23</div>
                    {dropDownNotif && (
                        <div className="dropdown-menu">
                            <DropdownNotif />
                        </div>
                    )}
                </div>
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
export default DeptHeader;