import { Navigate } from 'react-router-dom';
import { getAddExercise, getLogin } from 'app/providers/router';
import { useTheme } from 'app/providers/theme-provider';
import { Calendar } from 'widgets/calendar';
import { useAuth } from 'features/auth/hooks/useAuth';
import { Footer } from 'widgets/footer';
import { WorkoutList } from 'widgets/workout-list';
import { Content } from 'widgets/content';

export const TrainingPage = () => {
  const { isAuth } = useAuth();

  return isAuth ? (
    <>
      <Calendar />
      <Content>
        <WorkoutList />
      </Content>
      <Footer link={getAddExercise()} text='Добавить упражнения' big />
    </>
  ) : (
    <Navigate to={getLogin()} />
  );
};
