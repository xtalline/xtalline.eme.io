import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/header.css";
import "../assets/styles/dropdown.css";
import supabase from "../config/supabaseClient";
import DeptHeader from "./deptheads/DeptHeader";
import InstructorHeader from "./instructors/InstructorHeader";
import StudentHeader from "./students/StudentHeader";

const Header = ({ token }) => {
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
            <DeptHeader />
        )
    } else if (userType === "instructor") {
        return (
            <InstructorHeader />
        )
    } else if (userType === "student") {
        return (
            <StudentHeader />
        )
    }



}
export default Header;