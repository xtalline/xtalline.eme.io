import React, { useEffect, useState } from "react";
import "../assets/styles/profile.css";
import supabase from "../config/supabaseClient";

const EditProfile = ({ token, navigateToProfileDetails }) => {
    const [userType, setUserType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [idnum, setIdNum] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', token.user.id)
                .single()

            if (error) {

            } else if (data) {
                setFirstName(data.firstname)
                setMiddleName(data.middlename)
                setLastName(data.lastname)
                setUserType(data.usertype)
                setEmail(data.email)
                setPhone(data.phone)
                setIdNum(data.idnum)
            }
        }
        fetchRooms()
    }, [token.user.id])

    return (
        <>
            <div className="content-wrapper">
                <div className="edit-profile-details">
                    <h3>Edit Profile</h3>

                    <label for="last-name">Last name</label>
                    <input type="text" id="last-name" value={lastName} contentEditable={true} />

                    <label for="first-name">First name</label>
                    <input type="text" id="first-name" value={firstName} />

                    <label for="middle-name">Middle name</label>
                    <input type="text" id="middle-name" value={middleName} />

                    <label for="student-num">Student number</label>
                    <input type="text" id="student-num" value={idnum} />
                </div>
                <div className="edit-profile-details">
                    <h3>Edit Contact Details</h3>

                    <label for="email-address">Email address</label>
                    <input type="text" id="email-address" value={email} />

                    <label for="contact-num">Contact number</label>
                    <input type="text" id="contact-num" value={phone} />
                </div>
            </div>
            <div className="profile-btn-container">
                <button className="save-btn">SAVE</button>
                <button className="edit-cancel-btn" onClick={navigateToProfileDetails}>CANCEL</button>
            </div>

        </>
    )
}
export default EditProfile;