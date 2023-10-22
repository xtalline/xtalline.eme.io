import React from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/profile.css";

import ProfileDetails from "../../components/ProfileDetails";
import EditProfile from "../../components/EditProfile";



const StudentProfile = ({ token }) => {
    const user = { userType: 'student' };

    const navigate = useNavigate();
    
    if (token) {
        return (
            <ProfileDetails token={token} />
        )
    } else if (!token) {
        navigate('/')
    }
}
export default StudentProfile;