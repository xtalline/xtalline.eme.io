import React, { useEffect, useState } from "react";
import "../assets/styles/profile.css";

import { HiPencil } from "react-icons/hi";
import { MdSave } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";
import supabase from "../config/supabaseClient";

const BasicInformation = ({ token }) => {
    const [editMode, setEditMode] = useState(false);
    const [firstname, setFirstName] = useState("");
    const [middlename, setMiddleName] = useState("");
    const [lastname, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");

    useEffect(() => {
        const fetchData = async () => {
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
                setGender(data.gender)
                setBirthday(data.birthday)
            }
        }
        fetchData()
    }, [token.user.id])

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = async () => {
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
            setGender(data.gender)
            setBirthday(data.birthday)
        }
        setEditMode(false);
    }

    const handleInputChange = async (e) => {
        e.preventDefault()

        if (!firstname || !middlename || !lastname) {
            console.log("error")
        } else {
            const { data, error } = await supabase
                .from('profiles')
                .update([{ firstname, middlename, lastname, gender, birthday }])
                .eq('id', token.user.id)
                .select()
            if (data) {
                window.location.reload()
            }


        }

    }


    /** For choosing pronouns */
    const [selectedGender, setSelectedGender] = useState("");
    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
        setGender(event.target.value)
    }



    return (
        <div className="details-wrapper">
            <div className="details-header">
                {editMode ? (
                    <>
                        <button
                            className="edit-save-btn"
                            onClick={handleCancelClick}>
                            <IoChevronBackOutline size={20} />
                        </button>
                        <h2>Edit Basic Information</h2>
                        <button
                            className="edit-save-btn"
                            onClick={handleInputChange}>
                            <MdSave size={20} />
                        </button>
                    </>

                ) : (
                    <>
                        <h2>Basic Information</h2>
                        <button
                            className="edit-save-btn"
                            onClick={handleEditClick}>
                            <HiPencil size={20} />
                        </button>
                    </>
                )}
            </div>

            {/** Details */}

            {editMode ? (
                <form onSubmit={handleInputChange}>
                    <label>Full name</label>
                    <input
                        label="First Name"
                        name="firstName"
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input
                        name="middleName"
                        type="text"
                        value={middlename}
                        onChange={(e) => setMiddleName(e.target.value)}
                    />

                    <input
                        name="lastName"
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    {/** Gender Selector */}
                    <label>Gender</label>
                    <div className="gender-selector">
                        <label>
                            Male
                            <input
                                type="radio"
                                name="genderGroup"
                                value="Male"
                                checked={selectedGender === 'Male'}
                                onChange={handleGenderChange}
                                required
                            />
                        </label>
                        <label>
                            Female
                            <input
                                type="radio"
                                name="genderGroup"
                                value="Female"
                                checked={selectedGender === 'Female'}
                                onChange={handleGenderChange}
                                required
                            />
                        </label>
                        <label>
                            Transgender
                            <input
                                type="radio"
                                name="genderGroup"
                                value="Transgender"
                                checked={selectedGender === 'Transgender'}
                                onChange={handleGenderChange}
                                required
                            />
                        </label>
                        <label>
                            Non-binary
                            <input
                                type="radio"
                                name="genderGroup"
                                value="Non-binary"
                                checked={selectedGender === 'Non-binary'}
                                onChange={handleGenderChange}
                                required
                            />
                        </label>
                        <label>
                            Prefer not to say
                            <input
                                type="radio"
                                name="genderGroup"
                                value="None"
                                checked={selectedGender === 'None'}
                                onChange={handleGenderChange}
                                required
                            />
                        </label>
                        <label>
                            Others
                            <input
                                type="radio"
                                name="genderGroup"
                                value="Others"
                                checked={selectedGender === 'Others'}
                                onChange={handleGenderChange}
                                required
                            />
                        </label>
                    </div>
                    <div className="others">
                        <input
                            type="text"
                            name="other-gender"
                            id="other-gender"
                            placeholder="Specify your gender identity"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            hidden={selectedGender !== "Others"}
                            required={selectedGender === "Others"}
                        />
                    </div>

                    {/** Birthdate Picker */}

                    <label>Birthdate</label>
                    <div className="bday-picker">
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </div>
                </form>
            ) : (
                <div className="details">
                    <label>Full name</label>
                    <input
                        type="text"
                        value={firstname}
                        readOnly
                        disabled
                    />
                    <input
                        type="text"
                        value={middlename}
                        readOnly
                        disabled
                    />

                    <input
                        type="text"
                        value={lastname}
                        readOnly
                        disabled
                    />


                    <label>Gender</label>
                    <input
                        type="text"
                        value={gender}
                        readOnly
                        disabled
                    />

                    <label>Birthdate</label>
                    <input
                        type="text"
                        value={birthday}
                        readOnly
                        disabled
                    />
                </div>
            )}
        </div>
    )
}
export default BasicInformation;