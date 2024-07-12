import classNames from 'classnames';
import cl from './TrainingPage.module.scss';
import { Button } from 'shared/ui/button/index';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAddExercise, getLogin } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import { Calendar } from 'widgets/calendar';
import { useAuth } from 'features/auth/hooks/useAuth';
import { ExercisesWorkoutCard } from 'widgets/exercises-card/exercises-workout-card';

export const TrainingPage = () => {
  const { theme } = useTheme();
  const { isAuth } = useAuth();

  const navigate = useNavigate();
  const addMoreBtnHandler = () => {
    navigate(getAddExercise());
  };

  return isAuth ? (
    <main className={classNames('app', cl.TrainingPage, {}, [theme])}>
      <section className={cl.calendar}>
        <Calendar />
      </section>
      <section className={cl.menu}>
        <ExercisesWorkoutCard />
        <div className={cl.footer}>
          <Button height="60px" radius="15px" onClick={addMoreBtnHandler}>
            Добавить еще
          </Button>
        </div>
      </section>
    </main>
  ) : (
    <Navigate to={getLogin()} />
  );
};
