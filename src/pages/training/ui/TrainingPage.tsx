import classNames from 'classnames';
import cl from './TrainingPage.module.scss';
import { Button } from 'shared/ui/button/index';
import { useAuth } from 'entities/Auth/hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAddExercise, getLogin } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import { ExercisesBlock } from 'widgets/exercisesBlock';
import { Calendar } from 'widgets/calendar';

export const TrainingPage = () => {
  const { theme } = useTheme();
  const { isAuth, user } = useAuth();

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
        <ExercisesBlock />
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
