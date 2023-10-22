import React from "react";

import "../assets/styles/dropdown.css";

import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const DropdownNotifItem = ({ notification }) => {
    return (
        <li>
            <div className="dropdownItem">
                {
                    //<img title={name} src={image} />
                }
                <div className="dropdown-notif-info">
                    <h4 title="Fullname">{notification.firstName + notification.middleName + notification.lastName}</h4>
                    <p>{"position"}</p>
                </div>

                <div className="notif-btn-wrapper">
                    <button className="notif-btn accept" title="Accept"><BsCheck2 size={20} /></button>
                    <button className="notif-btn reject" title="Reject"><RxCross2 size={20} /></button>
                </div>
            </div>
        </li>
    )
}

export default DropdownNotifItem;