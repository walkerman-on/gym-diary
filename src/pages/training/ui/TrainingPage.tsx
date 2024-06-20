import { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cl from "./TrainingPage.module.scss";
import { Button } from 'shared/ui/button/index';
import { useAuth } from 'entities/Auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';
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
  const [date, setDate] = useState('');
  const [exercises, setExercises] = useState<{ workoutId: string, name: string, sets: number, reps: number, weight: number }[]>([]);

  const toggleCalendarMenu = () => {
    setCollapsed(prevState => !prevState);
  };

  const dispatch = useAppDispatch()


  const handleAddExercise = () => {
    const workoutId = uniqid(); // Генерируем уникальный workoutId для новой тренировки

    // Создаем новую тренировку
    const newWorkout = {
      workoutId,
      date,
      exercises: [...exercises, { workoutId, name: '', sets: 0, reps: 0, weight: 0 }],
    };

    // Диспатчим событие добавления тренировки
    // dispatch(addWorkout({ userId: user?.id || '', workout: newWorkout }));
  };



  return isAuth ? (
    <main className={classNames("app container", {}, [theme])}>
      <div className={cl.TrainingPage}>
        <section className={cl.calendarBlock}>
          <div className={cl.theme}>
            <ThemeSwitcher />
          </div>
          <div className={classNames(cl.calendarMore, { [cl.calendarSmallHidden]: !collapsed })}>
            <Calendar />
          </div>
          <DropDownMenu collapsed={collapsed} maxHeight={500}>
            {!collapsed && <CalendarBig />}
          </DropDownMenu>
          <PullButton onClick={toggleCalendarMenu} />
        </section>
        <ExercisesBlock />
        <Link to={getAddExercise()}>
          <section className={cl.settingBlock}>
            <Button height='60px' radius='15px'>Добавить еще</Button>
          </section>
        </Link>
      </div>
    </main>
  ) : (
    <Navigate to={getLogin()} />
  );
};
