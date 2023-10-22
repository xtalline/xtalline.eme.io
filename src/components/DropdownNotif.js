import React, { useEffect, useState } from "react";

import "../assets/styles/dropdown.css"
import DropdownNotifItem from "./DropdownNotifItem";

import mockImage from "../assets/img/mock-img.png";
import supabase from "../config/supabaseClient";

const DropdownNotif = () => {
    const [notification, setNotification] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('chairperson_notification')
                .select()

            if (data) {
                setNotification(data)
            }
        }
        fetchData()

        const handleSubscription = supabase
            .channel('any')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'chairperson_notification' }, payload => {
                fetchData();
            })
            .subscribe();
        return () => {
            handleSubscription.unsubscribe();
        };
    }, [])
    return (

        <>
            <div className="dropdown-notif-wrapper">
                <div className="dropdown-notif-header">
                    <h2>Notifications</h2>
                    <button>Accept All</button>
                    <button>Reject All</button>
                </div>

                <ul>
                    {notification && (
                        <>
                            {notification.map(notification => (
                                <DropdownNotifItem key={notification.id} notification={notification} />
                            ))}
                        </>
                    )}

                </ul>
            </div>
        </>
    )
}

export default DropdownNotif;