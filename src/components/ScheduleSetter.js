import React, { useState } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import "../assets/styles/popup.css";

import { AiOutlinePlus } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";

const ScheduleSetter = () => {

    /** Add schedule handlers */
    const [schedules, setSchedules] = useState([]);

    const handleAddSchedule = () => {
        setSchedules([...schedules, ""]);
    };

    const handleDeleteSchedule = (index) => {
        const updatedSchedules = [...schedules];
        updatedSchedules.splice(index, 1);
        setSchedules(updatedSchedules);
    };

    const handleScheduleChange = (e, index) => {
        const updatedSchedules = [...schedules];
        updatedSchedules[index] = e.target.value;
        setSchedules(updatedSchedules);
    };

    /** Add schedule Time Picker*/
    const [schedFrom, setSchedFrom] = React.useState(dayjs('2022-04-17T15:30'));
    const [schedTo, setSchedTo] = React.useState(dayjs('2022-04-17T15:30'));
    /** */

    return (
        /** Schedule Setter */
        <div className="add-edit-sched-container">
            
                <div className="add-sched-inputs">
                    <div className="input-timepicker-container">
                        <input
                            className="sched-title-input"
                            type="text"
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                <TimePicker
                                    label="From"
                                    value={schedFrom}
                                    onChange={(newValue) => setSchedFrom(newValue)}
                                />
                                <TimePicker
                                    label="To"
                                    value={schedTo}
                                    onChange={(newValue) => setSchedTo(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
            
        </div>
    )
}
export default ScheduleSetter;