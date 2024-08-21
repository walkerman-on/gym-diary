import classNames from 'classnames';
import cl from './TrainingPage.module.scss';
import { Navigate } from 'react-router-dom';
import { getAddExercise, getLogin } from 'app/providers/router';
import { useTheme } from 'app/providers/theme-provider';
import { Calendar } from 'widgets/calendar';
import { useAuth } from 'features/auth/hooks/useAuth';
import { ExercisesWorkoutCard } from 'widgets/exercises-card/exercises-workout-card';
import { Footer } from 'widgets/footer';
import { Button } from '@mui/material';
import { addWorkout, IWorkout } from 'features/workout';
import { useAppDispatch } from 'shared/lib/hooks';

const exerciseInWorkout = {
  exercise: {
    categoryId: "FxFF9cC1",
    id: "ididi",
    name: "Штанга на рdsdcdcуки",
    selected: false
  },
  sets:
    [
      {
        id: 1,
        reps: 10,
        weight: 30
      }
    ]
}

export const TrainingPage = () => {
  const { theme } = useTheme();
  const { isAuth } = useAuth();

  const dispatch = useAppDispatch()

  const addMoreBtnHandler = () => {
    dispatch(addWorkout({ date: "2024-08-24", exercise: exerciseInWorkout }))
  }
  return isAuth ? (
    <main className={classNames('app', cl.TrainingPage, {}, [theme])}>
      <Calendar />
      <ExercisesWorkoutCard />
      <Button onClick={addMoreBtnHandler}>Добавь упражнение</Button>
      <Footer link={getAddExercise()} text='Добавить еще' />
    </main>
  ) : (
    <Navigate to={getLogin()} />
  );
};
