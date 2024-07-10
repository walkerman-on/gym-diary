import React, { useState } from 'react';
import cl from "./Calendar.module.scss"
import { CalendarСollapsed } from 'widgets/сalendarСollapsed';
import { CalendarExpanded } from 'widgets/calendarExpanded';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';

export const Calendar = () => {
    const [showCalendarBig, setShowCalendarBig] = useState<boolean>(true);

    const toggleCalendarBig = () => {
        setShowCalendarBig((prev) => !prev);
    };

    return (
        <>
            {showCalendarBig ? <CalendarСollapsed /> : <CalendarExpanded />}
            <span onClick={toggleCalendarBig} className={cl.arrow}>
                {
                    showCalendarBig ? <ArrowDownIcon /> : <ArrowUpIcon />
                }
            </span>
        </>
    );
};
