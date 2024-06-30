import { useState } from 'react';
import classNames from 'classnames';
import cl from "./TrainingPage.module.scss";
import { Button } from 'shared/ui/button/index';
import { useAuth } from 'entities/Auth/hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAddExercise, getLogin } from 'app/providers/router';
import { Calendar } from 'shared/ui/calendar';
import { DropDownMenu } from 'widgets/dropDownMenu';
import { useTheme } from 'app/providers/ThemeProvider';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { ExercisesBlock } from 'widgets/exercises';
import { CalendarBig } from 'shared/ui/calendarBig';
import { Link } from 'react-router-dom';
import { PullButton } from 'shared/ui/pullButton';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addWorkout } from 'entities/workout/api/addWorkout';
import uniqid from 'uniqid';
import { createInitialStructure } from "shared/helper/createInitialStructure"

export const TrainingPage = () => {
  const { theme } = useTheme();
  const { isAuth, user } = useAuth();

  createInitialStructure(user?.id);


  const [collapsed, setCollapsed] = useState<boolean>(true);
  const toggleCalendarMenu = () => {
    setCollapsed(prevState => !prevState);
  };

  const navigate = useNavigate()
  const addMoreBtnHandler = () => {
    navigate(getAddExercise())
  }


  return isAuth ? (
    <main className={classNames("app", cl.TrainingPage, {}, [theme])}>
      <section className={cl.trainingPageHeader}>
        {/* <ThemeSwitcher /> */}
        <Calendar />
        {/* <div className={classNames(cl.calendarMore, { [cl.calendarSmallHidden]: !collapsed })}>
        </div> */}
        {/* <DropDownMenu collapsed={collapsed} maxHeight={500}>
          {!collapsed && <CalendarBig />}
        </DropDownMenu>
        <PullButton onClick={toggleCalendarMenu} /> */}
      </section>
      <section className={cl.mainMenu}>
        <ExercisesBlock />
      </section>
      <div className={cl.menuFooter}>
        <Button height='60px' radius='15px' onClick={addMoreBtnHandler}>Добавить еще</Button>
      </div>
    </main>
  ) : (
    <Navigate to={getLogin()} />
  );
};
