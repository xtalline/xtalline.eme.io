import React, { useEffect, useState } from "react";

import "../assets/styles/profile.css";


import supabase from "../config/supabaseClient";
import DeptProfile from "./deptheads/DeptProfile";
import InstructorProfile from "./instructors/InstructorProfile";
import StudentProfile from "./students/StudentProfile";

const Profile = ({ token }) => {
    const [userType, setUserType] = useState("");
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
            }
        }
        fetchData()
    }, [token.user.id])
    if (userType === "chairperson") {
        return (
            <DeptProfile token={token} />
        )
    } else if (userType === "instructor") {
        return (
            <InstructorProfile token={token} />
        )
    } else if (userType === "student") {
        return (
            <StudentProfile token={token} />
        )
    }
}
export default Profile;