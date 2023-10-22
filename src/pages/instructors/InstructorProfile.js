import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/profile.css";
import Avatar from "../../assets/img/male-avatar.png";

import ProfileDetails from "../../components/ProfileDetails";
import EditProfile from "../../components/EditProfile";



const InstructorProfile = ({ token }) => {
    const user = { userType: 'instructor' };

    const navigate = useNavigate();

    if (token) {
        return (
            <ProfileDetails token={token} />
        )
    } else if (!token) {
        navigate('/');
    }
    /*return (
        <div className="profile-wrapper">
            <div className="profile-img-container">
                <img alt="profile avatar" src={Avatar} />
                <p>Image is retrieved from your Google Account</p>
            </div>
            <div className="container">
                <Routes>
                    <Route path="/*" element={token ? <ProfileDetails navigateToEditProfile={navigateToEditProfile}
                        token={token} /> : <Navigate to="/login" />} />
                    <Route path="/profile/edit" element={<EditProfile navigateToProfileDetails={navigateToProfileDetails} token={token}/>} />
                </Routes>
            </div>
        </div>
    )*/
}
export default InstructorProfile;