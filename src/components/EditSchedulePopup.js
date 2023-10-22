import React from "react";

import "../assets/styles/popup.css";

import ScheduleSetter from "./ScheduleSetter";

const EditSchedulePopup = ({ togglePopupEdit, nameOfDay }) => {
    return (
        <div className="pop-up-wrapper">
            <div className="pop-up-overlay">
                <div className="pop-up-content pop-up-edit">
                    <h1>EDIT SCHEDULE</h1>
                    <p className="schedule-label">Schedule for {nameOfDay}</p>
                    {/** Schedule Setter */}
                    <ScheduleSetter />
                    {/** */}

                    <div className="btn-container">
                        <button className="pop-up-btn">SAVE</button>
                        <button className="pop-up-btn" onClick={togglePopupEdit}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditSchedulePopup;