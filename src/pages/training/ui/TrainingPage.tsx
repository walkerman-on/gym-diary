import React, { useState } from 'react';
import classNames from 'classnames';
import cl from './TrainingPage.module.scss';
import { Button } from 'shared/ui/button/index';
import { useAuth } from 'entities/Auth/hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAddExercise, getLogin } from 'app/providers/router';
import { Calendar } from 'shared/ui/calendar';
import { DropDownMenu } from 'widgets/dropDownMenu';
import { useTheme } from 'app/providers/ThemeProvider';
import { ExercisesBlock } from 'widgets/exercises';
import { CalendarBig } from 'shared/ui/calendarBig';
import { PullButton } from 'shared/ui/pullButton';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';

export const TrainingPage = () => {
  const { theme } = useTheme();
  const { isAuth, user } = useAuth();

  const [showCalendarBig, setShowCalendarBig] = useState<boolean>(true);

  const navigate = useNavigate();
  const addMoreBtnHandler = () => {
    navigate(getAddExercise());
  };

  const toggleCalendarBig = () => {
    setShowCalendarBig((prev) => !prev);
  };

  return isAuth ? (
    <main className={classNames('app', cl.TrainingPage, {}, [theme])}>
      <section className={cl.trainingPageHeader}>
        {showCalendarBig ? <Calendar /> : <CalendarBig />}
        <span onClick={toggleCalendarBig} className={cl.arrow}>
          {
            showCalendarBig ? <ArrowDownIcon /> : <ArrowUpIcon />
          }

        </span>
      </section>
      <section className={cl.mainMenu}>
        <ExercisesBlock />
      </section>
      <div className={cl.menuFooter}>
        <Button height="60px" radius="15px" onClick={addMoreBtnHandler}>
          Добавить еще
        </Button>
      </div>
    </main>
  ) : (
    <Navigate to={getLogin()} />
  );
};
