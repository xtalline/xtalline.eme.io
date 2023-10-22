import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/profile.css";

import { AiOutlineSchedule, AiOutlineProfile } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { BsPersonLock } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";

import Avatar from "../assets/img/male-avatar.png";

import supabase from "../config/supabaseClient";

import BasicInformation from "./BasicInformation";
import AccountSettings from "./AccountSettings";
import EmploymentInfo from "./EmploymentInfo";

const ProfileDetails = ({ token }) => {
    /** Active Profile Navigation */
    const location = useLocation();
    const [activeRoute, setActiveRoute] = useState("");
    useEffect(() => {
        setActiveRoute(location.pathname);
    }, [location]);

    const [userType, setUserType] = useState("");
    const [employeenum, setEmployeeNum] = useState("");
    const [idnum, setIDNum] = useState("");
    const [accountStatus, setAccountStatus] = useState("")
    const [account_confirmed_at, setAccountConfirmedAt] = useState("")


    const navigate = useNavigate();

    const navigateToSchedule = () => {
        navigate('/schedule');
    }
    const navigateToBasicInfo = () => {
        navigate('/profile');
    }
    const navigateToEmployeeInfo = () => {
        navigate('/profile/employment-information');
    }
    const navigateToAccountSettings = () => {
        navigate('/profile/account-settings')
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', token.user.id)
                .single()

            if (error) {

            } else if (data) {
                setUserType(data.usertype)
                setEmployeeNum(data.employeenum)
                setIDNum(data.idnum)
                setAccountConfirmedAt(data.account_confirmed_at)
                setAccountStatus(data.accountStatus)
            }
        }
        fetchData()

    }, [token.user.id])


    const handleLogout = async () => {

        navigate('/')
        window.location.reload()
        sessionStorage.removeItem('token')

    }

    return (
        <div className="profile-wrapper">
            <div className="leftside-wrapper">
                <div className="img-wrapper">
                    <img src={Avatar} alt="profile avatar" />
                </div>
                <div className="profile-navigation">
                    <div className="identity-number">
                        {userType === "instructor" || userType === "chairperson" ? (
                            <h4>{employeenum}</h4>
                        ) : (
                            <h4>{idnum}</h4>
                        )}
                    </div>
                    <div className="nav-items">

                        <button className={`nav-item ${activeRoute === "/profile" ? "nav-item active" : ""
                            }`}
                            onClick={navigateToBasicInfo}>
                            Basic Information
                            <RxAvatar size={20} className="ic" />
                        </button>

                        {userType === "instructor" || userType === "chairperson" ? (
                            <button className={`nav-item ${activeRoute === "/profile/employee-information" ? "nav-item active" : ""}`}
                                onClick={navigateToEmployeeInfo}>
                                Employee Information
                                <AiOutlineProfile className="ic" size={20} />
                            </button>
                        ) : null}

                        <button className={`nav-item ${activeRoute === "/profile/account-settings" ? "nav-item active" : ""
                            }`}
                            onClick={navigateToAccountSettings}>
                            Account Settings
                            <BsPersonLock size={20}
                                className="ic" />
                        </button>

                        {userType === "instructor" || userType === "chairperson" ? (
                            accountStatus && account_confirmed_at && token.user.email_confirmed_at &&
                            (<button onClick={navigateToSchedule}
                                className="nav-item">
                                View Schedule
                                <IoIosArrowForward className="ic" size={20} />
                            </button>)
                        ) : null}
                    </div>


                    <div className="signout-wrapper">
                        <button className="signout-btn" onClick={handleLogout}>SIGN OUT</button>
                    </div>
                </div>
            </div>

            <div className="rightside-wrapper">
                <Routes>
                    <Route path="/*" element={<BasicInformation token={token} />}></Route>
                    <Route path="/profile/employment-information" element={<EmploymentInfo token={token} />}></Route>
                    <Route path="/profile/account-settings" element={<AccountSettings token={token} />}></Route>
                </Routes>
            </div>
            {/**
            <div className="content-wrapper">
                <div className="profile-img-container">
                    <img alt="profile avatar" src={Avatar} />
                    <p>Image is retrieved from your Google Account</p>
                </div>
                <div className="profile-details">
                    <h3>Personal Information</h3>
                    <label for="last-name">Last name</label>
                    <input type="text" id="last-name" value={lastName} disabled />

                    <label for="first-name">First name</label>
                    <input type="text" id="first-name" value={firstName} disabled />

                    <label for="middle-name">Middle name</label>
                    <input type="text" id="middle-name" value={middleName} disabled />

                    <label for="student-num">Student number</label>
                    <input type="text" id="student-num" value={idnum} disabled />
                </div>
                <div className="profile-details">
                    <h3>Contact Details</h3>

                    <label for="email-address">Email address</label>
                    <input type="text" id="email-address" value={email} disabled />

                    <label for="contact-num">Contact number</label>
                    <input type="text" id="contact-num" value={phone} disabled />

                    {userType === "instructor" || userType === "depthead" ? (
                        <button onClick={navigateToSchedule} className="view-sched-btn">
                            <AiOutlineSchedule className="view-sched-btn-ic" size={20} />
                            <p className="view-sched-btn-label">View Schedule</p>
                            <IoIosArrowForward size={20} />
                        </button>
                    ) : null}
                </div>
            </div>
             */}
            {/**
            <div className="profile-btn-container">
                <button className="edit-cancel-btn" onClick={navigateToEditProfile}>EDIT</button>

                <button className="signout-btn" onClick={handleLogout}>SIGN OUT</button>
            </div>
             */}


            {/**
            <div className="content-wrapper">
                <div className="profile-img-container">
                    <img alt="profile avatar" src={Avatar} />
                    <p>Image is retrieved from your Google Account</p>
                </div>
                <div className="profile-details">
                    <h3>Personal Information</h3>
                    <label for="last-name">Last name</label>
                    <input type="text" id="last-name" value={lastName} disabled />

                    <label for="first-name">First name</label>
                    <input type="text" id="first-name" value={firstName} disabled />

                    <label for="middle-name">Middle name</label>
                    <input type="text" id="middle-name" value={middleName} disabled />

                    <label for="student-num">Student number</label>
                    <input type="text" id="student-num" value={idnum} disabled />
                </div>
                <div className="profile-details">
                    <h3>Contact Details</h3>

                    <label for="email-address">Email address</label>
                    <input type="text" id="email-address" value={email} disabled />

                    <label for="contact-num">Contact number</label>
                    <input type="text" id="contact-num" value={phone} disabled />

                    {userType === "instructor" || userType === "depthead" ? (
                        <button onClick={navigateToSchedule} className="view-sched-btn">
                            <AiOutlineSchedule className="view-sched-btn-ic" size={20} />
                            <p className="view-sched-btn-label">View Schedule</p>
                            <IoIosArrowForward size={20} />
                        </button>
                    ) : null}
                </div>
            </div>
             */}
            {/**
            <div className="profile-btn-container">
                <button className="edit-cancel-btn" onClick={navigateToEditProfile}>EDIT</button>

                <button className="signout-btn" onClick={handleLogout}>SIGN OUT</button>
            </div>
             */}
        </div>
    )
}
export default ProfileDetails;