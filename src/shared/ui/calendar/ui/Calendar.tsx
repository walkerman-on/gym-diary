import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import cl from "./Calendar.module.scss"
import classNames from 'classnames';

dayjs.locale('ru'); 

export const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const renderWeekDays = (startOfWeek: Dayjs) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, 'day');
      days.push(
        <div key={i} className={cl.days}>
            <ul>
                <li className={cl.dayName}>
                    {day.format('dd')}
                </li>
            </ul>
            <ul>
                <li className={classNames(cl.dayNumber, {[cl.dayNumberActive]: false})}>
                    {day.format('D')}
                </li>
            </ul>
        </div>
      );
    }
    return <div className={cl.week}>{days}</div>;
  };

  const startOfWeek = selectedDate ? selectedDate.startOf('week') : dayjs().startOf('week');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {renderWeekDays(startOfWeek)}
    </LocalizationProvider>
  );
};
