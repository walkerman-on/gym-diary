import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import cl from "./CalendarСollapsed.module.scss"
import classNames from 'classnames';
import { ThemeSwitcher } from 'shared/ui/theme-switcher';
import { fetchDateCurrent } from 'features/calendar';
import { ICalendar } from '../../../types/types';
import SettingsIcon from 'shared/assets/icons/SettingsIcon';
import { useNavigate, useParams } from 'react-router-dom';
import { getDate, getSettings } from 'app/providers/router';
import { fetchWorkout } from 'features/workout';
import { useAppDispatch } from 'shared/lib/hooks';

dayjs.locale('ru');

export const CalendarСollapsed: React.FC<ICalendar> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { date } = useParams();

  // Initialize the selected date state based on the URL parameter
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(() => {
    const dateFromUrl = date ? dayjs(date, 'YYYY-MM-DD') : null;
    return dateFromUrl.isValid() ? dateFromUrl : dayjs();
  });

  const today = dayjs();

  useEffect(() => {
    // Fetch workout data whenever the selected date changes
    if (selectedDate) {
      dispatch(fetchWorkout({ date: selectedDate.format('YYYY-MM-DD') }));
    }
  }, [selectedDate, dispatch]);

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
      navigate(getDate(date.format('YYYY-MM-DD')));
    }
  };

  const renderWeekDays = (startOfWeek: Dayjs) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, 'day');
      const isToday = day.isSame(today, 'day');
      days.push(
        <ul key={i} className={cl.days}>
          <li
            className={classNames(cl.day, {
              [cl.daySelected]: selectedDate && selectedDate.isSame(day, 'day'),
              [cl.dayCurrentNotSelected]: isToday,
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

  const settingsOnClick = () => {
    navigate(getSettings());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={cl.header}>
        <span className={cl.currentMonth}>{selectedDate ? selectedDate.format('MMMM YYYY') : dayjs().format('MMMM YYYY')}</span>
        {/* <ThemeSwitcher /> */}
        <SettingsIcon onClick={settingsOnClick} />
      </div>
      {renderWeekDays(startOfWeek)}
    </LocalizationProvider>
  );
};
