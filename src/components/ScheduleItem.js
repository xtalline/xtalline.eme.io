import React, { useState } from "react";
import "../assets/styles/schedule.css";
import { HiPencil, HiTrash } from "react-icons/hi";
import EditSchedulePopup from "./EditSchedulePopup";
import DeletePopup from "./DeletePopup";
import AddSchedulePopup from "./AddSchedulePopup";

const ScheduleItem = (props) => {
    const [popupAdd, setPopupAdd] = useState(false);
    const togglePopupAdd = () => {
        setPopupAdd(!popupAdd)
    }

    const [popupEdit, setPopupEdit] = useState(false);
    const togglePopupEdit = () => {
        setPopupEdit(!popupEdit)
    }

    const [popupDelete, setPopupDelete] = useState(false);
    const togglePopupDelete = () => {
        setPopupDelete(!popupDelete)
    }

    return (
        <div className="schedule-item">
            <div className="schedule-item-header">
                <h5>{props.nameOfDay}</h5>
                <button onClick={togglePopupAdd}>ADD</button>
                    {popupAdd && (<AddSchedulePopup togglePopupAdd={togglePopupAdd} nameOfDay={props.nameOfDay} />)}
            </div>
            <div className="schedule-item-content">
                <div className="schedule-detail">
                    <h6>COSC 110</h6>
                    <p>8:30 - 9:30 AM</p>
                    <div className="schedule-detail-options">
                        <HiPencil className="schedule-item-ic edit" onClick={togglePopupEdit} />
                        {popupEdit && (<EditSchedulePopup togglePopupEdit={togglePopupEdit} nameOfDay={props.nameOfDay} />)}

                        <HiTrash className="schedule-item-ic delete" onClick={togglePopupDelete} />
                        {popupDelete && (<DeletePopup togglePopupDelete={togglePopupDelete} />)}
                    </div>
                </div>
                
                <div className="schedule-detail">
                    <h6>COSC 110</h6>
                    <p>8:30 - 9:30 AM</p>
                </div>
                <div className="schedule-detail">
                    <h6>COSC 110</h6>
                    <p>8:30 - 9:30 AM</p>
                </div>
                <div className="schedule-detail">
                    <h6>COSC 110</h6>
                    <p>8:30 - 9:30 AM</p>
                </div>
            </div>
        </div>
    )
}
export default ScheduleItem;