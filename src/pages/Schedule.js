import React, { useState, } from "react";
import { useNavigate } from 'react-router-dom';
import "../assets/styles/schedule.css";
import ScheduleItem from "../components/ScheduleItem";
import AddSchedulePopup from "../components/AddSchedulePopup";
import DeletePopup from "../components/DeletePopup";

import { IoChevronBackOutline } from "react-icons/io5";

function Schedule() {
    const [popupAdd, setPopupAdd] = useState(false);
    const togglePopupAdd = () => {
        setPopupAdd(!popupAdd)
    }

    const [popupDelete, setPopupDelete] = useState(false);
    const togglePopupDelete = () => {
        setPopupDelete(!popupDelete)
    }

    const navigate = useNavigate();

    // Function to handle the back button click
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="schedule-wrapper">
            <div className="schedule-wrapper-header">
                <button
                    className="back-btn"
                    onClick={handleGoBack}>
                    <IoChevronBackOutline size={20} />
                </button>
                <h1>YOUR DAILY SCHEDULE</h1>
                
            </div>

            <div className="schedule-item-wrapper">
                <ScheduleItem nameOfDay={"Mondays"} />
                <ScheduleItem nameOfDay={"Tuesdays"} />
                <ScheduleItem nameOfDay={"Wednesdays"} />
                <ScheduleItem nameOfDay={"Thurdays"} />
                <ScheduleItem nameOfDay={"Fridays"} />
                <ScheduleItem nameOfDay={"Saturdays"} />
            </div>
        </div>
    );

}
export default Schedule;