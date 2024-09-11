import classNames from 'classnames';
import cl from './TrainingPage.module.scss';
import { Navigate } from 'react-router-dom';
import { getAddExercise, getLogin } from 'app/providers/router';
import { useTheme } from 'app/providers/theme-provider';
import { Calendar } from 'widgets/calendar';
import { useAuth } from 'features/auth/hooks/useAuth';
import { Footer } from 'widgets/footer';
import { WorkoutList } from 'widgets/workout-list';

export const TrainingPage = () => {
  const { theme } = useTheme();
  const { isAuth } = useAuth();

  return isAuth ? (
    <main className={classNames('app', cl.TrainingPage, {}, [theme])}>
      <Calendar />
      <WorkoutList />
      <Footer link={getAddExercise()} text='Добавить еще' />
    </main>
  ) : (
    <Navigate to={getLogin()} />
  );
};
