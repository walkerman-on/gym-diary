import React, { useState } from 'react';
import cl from "./Calendar.module.scss"
import { CalendarСollapsed } from 'features/calendar/ui/сalendar-collapsed';
import { CalendarExpanded } from 'features/calendar/ui/calendar-expanded';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';
import { useAuth } from 'features/auth/hooks/useAuth';
import SettingsIcon from 'shared/assets/icons/SettingsIcon';

export const Calendar = () => {
    const [showCalendarBig, setShowCalendarBig] = useState<boolean>(true);
    const toggleCalendarBig = () => {
        setShowCalendarBig((prev) => !prev);
    };

    return (
        <section className={cl.calendar}>
            {showCalendarBig ? <CalendarСollapsed /> : <CalendarExpanded />}
            <span onClick={toggleCalendarBig} className={cl.arrow}>
                {
                    showCalendarBig ? <ArrowDownIcon /> : <ArrowUpIcon />
                }
            </span>
        </section>
    );
};
