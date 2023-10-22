import React from "react";

import ScheduleSetter from "./ScheduleSetter";
import DayPicker from "./DayPicker";


const AddSchedulePopup = ({ togglePopupAdd }) => {
    return (
        <div className="pop-up-wrapper">
            <div className="pop-up-overlay">
                <div className="pop-up-content pop-up-edit">

                    <h1>ADD NEW SCHEDULE</h1>

                    {/** Schedule Setter */}
                    <ScheduleSetter />

                    <div className="btn-container">
                        <button className="pop-up-btn">ADD</button>
                        <button className="pop-up-btn" onClick={togglePopupAdd}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddSchedulePopup;