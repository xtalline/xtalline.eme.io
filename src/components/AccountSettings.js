import React, { useEffect, useState, useRef } from "react";
import "../assets/styles/profile.css";

import { MdCancel } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { AiOutlineDownSquare, AiOutlineUpSquare } from "react-icons/ai";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { RiInformationLine } from "react-icons/ri";
import { RxCopy } from "react-icons/rx";
import supabase from "../config/supabaseClient";

const AccountSettings = ({ token }) => {
    const verificationNumRef = useRef(null);
    const handleCopy = (text) => {
        console.log('Copying text:', text);
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard:', text);
                window.alert("'" + text + "'" + " is copied to clipboard!");
            })
            .catch((error) => {
                console.error('Error copying text:', error);
                window.alert("Failed to copy '" + text + "' to clipboard!");
            });
    };


    const [userID, setUserID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userType, setUserType] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [role, setRole] = useState("");
    const [accountStatus, setAccountStatus] = useState("");
    const [account_confirmed_at, setAccountConfirmedAt] = useState("");
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    const date = `${year}-${month}-${day}`;

    const [openDropdown, setOpenDropdown] = useState(false);
    const handleDropDown = () => {
        setOpenDropdown(!openDropdown);
    }

    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', token.user.id)
                .single()

            if (error) {

            } else if (data) {
                setEmail(data.email)
                setUserID(data.id)
                setFirstName(data.firstname)
                setMiddleName(data.middlename)
                setLastName(data.lastname)
                setUserType(data.usertype)
                setDepartmentName(data.departmentname)
                setRole(data.role)
                setAccountStatus(data.accountStatus)
                setAccountConfirmedAt(`${time} ${date}`)
            }
        }
        fetchData()

        const handleSubscription = supabase
            .channel('any')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles' }, payload => {
                console.log('Change received!', payload);
                fetchData();
            })
            .subscribe();
        return () => {
            handleSubscription.unsubscribe();
        };
    }, [token.user.id])


    const handleInputChange = async (e) => {
        e.preventDefault()

    }
    const handleRequestButton = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase
            .from('admin_notification')
            .select()
            .eq('userID', token.user.id)
            .single()
        if (data) {
            const { data, error } = await supabase
                .from('admin_notification')
                .delete()
                .eq('userID', token.user.id)
                .select()

            if (data) {
                const { data, error } = await supabase
                    .from('admin_notification')
                    .insert([{ firstName, middleName, lastName, userType, departmentName, role, userID, time, date }])
                    .select()
            }
        } else {
            const { data, error } = await supabase
                .from('admin_notification')
                .insert([{ firstName, middleName, lastName, userType, departmentName, role, userID, time, date }])
                .select()
        }
    }

    return (
        <div className="details-wrapper">
            <div className="details-header">
                <h2>Account Credentials</h2>
            </div>
            <div className="details">
                <label>Email {!token.user.email_confirmed_at && (<span>(not yet verified)</span>)}</label>
                <div className="email-wrapper">
                    <input
                        type="email"
                        value={email}
                        readOnly
                        disabled
                    />
                    {!token.user.email_confirmed_at ? (
                        <div className="email-verification-badge not-verified">
                            <MdCancel size={25} title="Email not yet verified" />
                        </div>
                    ) : (
                        <div className="email-verification-badge verified">
                            <TbDiscountCheckFilled size={25} title="Verified Email" />
                        </div>
                    )}
                </div>

                <button className="ch-pw">
                    <p>
                        Change Password
                        <IoKeyOutline size={15} />
                    </p>
                    {openDropdown ? (<AiOutlineUpSquare
                        size={22}
                        className="ch-pw-ic"
                        onClick={handleDropDown}
                    />)
                        : (<AiOutlineDownSquare
                            size={22}
                            className="ch-pw-ic"
                            onClick={handleDropDown}
                        />)}

                </button>
                {openDropdown && (
                    <div className="ch-pw-dropdown">
                        <form onSubmit={handleInputChange}>
                            <label>Current Password</label>
                            <input
                                name="password"
                                type="password"
                                onChange={handleInputChange}
                            />

                            <label>New Password</label>
                            <input
                                name="newPassword"
                                type="password"
                                onChange={handleInputChange}
                            />

                            <label>Confirm New Password</label>
                            <input
                                name="confirmNewPassword"
                                type="password"
                                onChange={handleInputChange}
                            />
                        </form>
                        <button>SAVE CHANGES</button>
                    </div>
                )}

                {(userType === "instructor" || userType === "chairperson") &&
                    (
                        <>
                            <label>Account Status {accountStatus && (<span>(Account Verified on {account_confirmed_at})</span>)}</label>
                            <div className="request-wrapper">
                                {!accountStatus ? (
                                    <>
                                        <button onClick={handleRequestButton}>Request Account Approval</button>
                                        <p>Why do you need to do this? </p>
                                        <button>
                                            <RiInformationLine size={18}
                                                title="You need to request approval of your account from the HR
                                and your Department Chairperson to confirm that you are an instructor."/>
                                        </button>
                                    </>
                                ) : (
                                    <div className="verification-details">
                                        <h4>Verification number:</h4>
                                        <h4 className="verification-id" ref={verificationNumRef}>
                                            {accountStatus}
                                        </h4>
                                        <div className="copy-ic">
                                            <RxCopy
                                                size={16}
                                                onClick={() => handleCopy(verificationNumRef.current.innerText)} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}
export default AccountSettings;