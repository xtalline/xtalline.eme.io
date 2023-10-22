import React, { useState } from "react";

import "../assets/styles/popup.css";

const DayPicker = () => {
        /**Days of the week selector*/
        const [selectedDays, setSelectedDays] = useState([]);

        const handleDayClick = (day) => {
                console.log(day)
        
                if (selectedDays.includes(day)) {
                        setSelectedDays(selectedDays.filter((d) => d !== day));
                } else {
                        setSelectedDays([...selectedDays, day]);
                }
        };
        /** */

        return (
                /** Days of the week selector */
                <div className="days-btn-container">
                        <button onClick={() => handleDayClick('Sunday')}
                                className={selectedDays.includes('Sunday') ? 'day-btn selected' : 'day-btn'}>Su</button>

                        <button onClick={() => handleDayClick('Monday')}
                                className={selectedDays.includes('Monday') ? 'day-btn selected' : 'day-btn'}>M</button>

                        <button onClick={() => handleDayClick('Tuesday')}
                                className={selectedDays.includes('Tuesday') ? 'day-btn selected' : 'day-btn'}>T</button>

                        <button onClick={() => handleDayClick('Wednesday')}
                                className={selectedDays.includes('Wednesday') ? 'day-btn selected' : 'day-btn'}>W</button>

                        <button onClick={() => handleDayClick('Thursday')}
                                className={selectedDays.includes('Thursday') ? 'day-btn selected' : 'day-btn'}>Th</button>

                        <button onClick={() => handleDayClick('Friday')}
                                className={selectedDays.includes('Friday') ? 'day-btn selected' : 'day-btn'}>F</button>

                        <button onClick={() => handleDayClick('Saturday')}
                                className={selectedDays.includes('Saturday') ? 'day-btn selected' : 'day-btn'}>Sa</button>
                </div>
        )
}
export default DayPicker;