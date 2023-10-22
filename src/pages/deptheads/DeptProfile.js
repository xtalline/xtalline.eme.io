import React from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/profile.css";
import Avatar from "../../assets/img/male-avatar.png";

import ProfileDetails from "../../components/ProfileDetails";
import EditProfile from "../../components/EditProfile";



const DeptProfile = ({token}) => {
    const user = { userType: 'chairperson' };

    const navigate = useNavigate();
    
    if (token) {
        return (
            <ProfileDetails token={token} />
        )
    } else if (!token) {
        navigate('/');
    }
}
export default DeptProfile;