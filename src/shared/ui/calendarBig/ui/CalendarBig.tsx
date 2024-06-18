import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import cl from "./CalendarBig.module.scss";
import classNames from 'classnames';
import { useSpring, animated } from '@react-spring/web';
import { useSwipeable } from 'react-swipeable'; // Updated import

dayjs.locale('ru');

export const CalendarBig: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  
  const startOfMonth = selectedDate.startOf('month');
  const endOfMonth = selectedDate.endOf('month');
  const startOfCalendar = startOfMonth.startOf('week');
  const endOfCalendar = endOfMonth.endOf('week');

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setSelectedDate(prev => prev.add(direction === 'next' ? 1 : -1, 'month'));
  };

  const handleDateChange = (dateKey: string) => {
    console.log('Выбранная дата:', dateKey);
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
      <div className={cl.daysGrid}>
        {dates.map(date => {
          const dateKey = date.format('YYYY-MM-DD');

          return (
            <div key={dateKey} className={cl.day}>
              <ul>
                <li
                  className={classNames(cl.dayNumber, {
                    [cl.dayNumberCurrent]: date.isSame(selectedDate, 'day'),
                    // [cl.dayNumberActive]: date.isSame(selectedDate, 'day'),
                    [cl.dayNumberOtherMonth]: !date.isSame(selectedDate, 'month')
                  })}
                  onClick={() => handleDateChange(dateKey)}
                >
                  {date.format('D')}
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekDays = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      weekDays.push(
        <div key={i} className={cl.day}>
          <span className={cl.dayNames}>
            {dayjs().day(i).format('dd')}
          </span>
        </div>
      );
    }
    return <div className={cl.daysGrid}>{weekDays}</div>;
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
      <animated.div style={slideProps} className={cl.Calendar} {...swipeHandlers}>
        <div className={cl.CalendarHeader}>
          <span className={cl.currentMonth}>{selectedDate.format('MMMM YYYY')}</span>
        </div>
        {renderWeekDays()}
        {renderDays()}
      </animated.div>
    </LocalizationProvider>
  );
};
