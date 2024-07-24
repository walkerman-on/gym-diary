import React, { useState } from 'react';
import cl from "./Calendar.module.scss"
import { CalendarСollapsed } from 'features/calendar/ui/сalendar-collapsed';
import { CalendarExpanded } from 'features/calendar/ui/calendar-expanded';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';
import { useAuth } from 'features/auth/hooks/useAuth';

export const Calendar = () => {
    const [showCalendarBig, setShowCalendarBig] = useState<boolean>(true);
    const { user } = useAuth()
    const toggleCalendarBig = () => {
        setShowCalendarBig((prev) => !prev);
    };

    return (
        <section className={cl.calendar}>
            {showCalendarBig ? <CalendarСollapsed userId={user?.id} /> : <CalendarExpanded userId={user?.id} />}
            <span onClick={toggleCalendarBig} className={cl.arrow}>
                {
                    showCalendarBig ? <ArrowDownIcon /> : <ArrowUpIcon />
                }
            </span>
        </section>
    );
};
