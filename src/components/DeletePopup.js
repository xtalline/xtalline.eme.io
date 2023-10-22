import React from "react";

import "../assets/styles/popup.css";

const DeletePopup = ({ togglePopupDelete }) => {
    return (
        <div className="pop-up-wrapper">
            <div className="pop-up-overlay">
                <div className="pop-up-content pop-up-delete">
                    <h1>ARE YOU SURE YOU WANT TO DELETE YOUR SCHEDULE?</h1>

                    <div className="btn-container">
                        <button className="pop-up-btn">DELETE</button>
                        <button className="pop-up-btn" onClick={togglePopupDelete}>CANCEL</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default DeletePopup;