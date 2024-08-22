import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import cl from "./CalendarExpanded.module.scss";
import classNames from 'classnames';
import { useSpring, animated } from '@react-spring/web';
import { useSwipeable } from 'react-swipeable';
import { fetchDateCurrent } from 'features/calendar';
import { ICalendar } from '../../../types/types';
import { getDate } from 'app/providers/router';
import { useNavigate } from 'react-router-dom';

dayjs.locale('ru');

export const CalendarExpanded: React.FC<ICalendar> = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedDateKey, setSelectedDateKey] = useState<string>(selectedDate.format('YYYY-MM-DD'));
  const today = dayjs();

  const startOfMonth = selectedDate.startOf('month');
  const endOfMonth = selectedDate.endOf('month');
  const startOfCalendar = startOfMonth.startOf('week');
  const endOfCalendar = endOfMonth.endOf('week');
  const navigate = useNavigate();

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setSelectedDate(prev => prev.add(direction === 'next' ? 1 : -1, 'month'));
  };

  const handleDateChange = (dateKey: string) => {
    setSelectedDate(dayjs(dateKey));
    setSelectedDateKey(dateKey);
    navigate(getDate(dateKey))
  };

  const generateCalendarDates = () => {
    const dates = [];
    let currentDate = startOfCalendar;

    while (currentDate.isBefore(endOfCalendar) || currentDate.isSame(endOfCalendar, 'day')) {
      dates.push(currentDate);
      currentDate = currentDate.add(1, 'day');
    }

    return dates;
  };

  const renderDays = () => {
    const dates = generateCalendarDates();

    return (
      <ul className={cl.daysGrid}>
        {dates.map(date => {
          const dateKey = date.format('YYYY-MM-DD');
          const isToday = date.isSame(today, 'day');

          return (
            <li
              key={dateKey}
              className={classNames(cl.day, {
                [cl.daySelected]: dateKey === selectedDateKey,
                [cl.dayNotFromCurrentMonth]: !date.isSame(selectedDate, 'month'),
                [cl.dayCurrentNotSelected]: isToday
              })}
              onClick={() => handleDateChange(dateKey)}
            >
              {date.format('D')}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderWeekDays = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      weekDays.push(
        <li key={i} className={cl.weekDays}>
          <span className={cl.dayNameTitle}>
            {dayjs().day(i).format('dd')}
          </span>
        </li>
      );
    }
    return <ul className={cl.daysGrid}>{weekDays}</ul>;
  };

  // React-spring animation for month transition
  const slideProps = useSpring({
    marginLeft: '0%',
    from: { marginLeft: '0%' },
    config: { friction: 30, tension: 200 }
  });

  // React-swipeable for handling swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleMonthChange('next'),
    onSwipedRight: () => handleMonthChange('prev')
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <animated.div style={slideProps} {...swipeHandlers}>
        <section className={cl.calendar}>
          <span className={cl.currentMonth}>{selectedDate.format('MMMM YYYY')}</span>
          <div className={cl.calendarBlock}>
            {renderWeekDays()}
            {renderDays()}
          </div>
        </section>
      </animated.div>
    </LocalizationProvider>
  );
};
