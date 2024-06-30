import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import cl from "./Calendar.module.scss"
import classNames from 'classnames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';

dayjs.locale('ru');

export const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const today = dayjs();

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    console.log(date?.format('YYYY-MM-DD'));
  };

  const renderWeekDays = (startOfWeek: Dayjs) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, 'day');
      const isToday = day.isSame(today, 'day');
      days.push(
        <ul key={i} className={cl.days}>
          <li
            className={classNames(cl.dayItem, {
              [cl.dayItemCurrent]: selectedDate && selectedDate.isSame(day, 'day'),
              [cl.currentDay]: isToday,
            })}
            onClick={() => handleDateChange(day)}
          >
            <span className={cl.title}>{day.format('D')}</span>
            <span className={cl.subTitle}>{day.format('dd')}</span>
          </li>
        </ul>
      );
    }
    return (
      <div className={cl.week}>
        {days}
      </div>
    );
  };

  const startOfWeek = selectedDate ? selectedDate.startOf('week') : dayjs().startOf('week');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={cl.header}>
        <span className={cl.currentMonth}>{selectedDate ? selectedDate.format('MMMM YYYY') : dayjs().format('MMMM YYYY')}</span>
        <ThemeSwitcher />
      </div>
      {renderWeekDays(startOfWeek)}
    </LocalizationProvider>
  );
};
