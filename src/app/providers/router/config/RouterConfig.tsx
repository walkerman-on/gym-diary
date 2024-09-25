import { AppRoutesProps } from './types';
import { getAddExercise, getDate, getExercisesByCategory, getExercisesBySearch, getLogin, getNotFound, getRegister, getSettings, getWorkout } from './routes';
import { LoginPage } from 'pages/login';
import { RegisterPage } from 'pages/register';
import { TrainingPage } from 'pages/training';
import { NotFoundPage } from 'pages/not-found';
import { AddExercisePage } from 'pages/add-exercise';
import { SettingsPage } from 'pages/settings';
import { ExercisesCategoryCard } from 'widgets/exercises-card/exercises-category-card';
import { CategoriesCard } from 'widgets/categories-card';
import { ExercisesSearchCard } from 'widgets/exercises-card/exercises-search-card';
import { Content } from 'widgets/content';
import { Navigate } from 'react-router-dom';

export enum AppRoutes {
  LOGIN = 'login',
  REGISTER = 'register',
  WORKOUT = 'workout',
  ADD_EXERCISE = 'add_exercise',
  SETTINGS = "settings",
  HOME = "home",
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: getLogin(),
  [AppRoutes.REGISTER]: getRegister(),
  [AppRoutes.WORKOUT]: getDate(":date"),
  [AppRoutes.SETTINGS]: getSettings(),
  [AppRoutes.ADD_EXERCISE]: getAddExercise(),
  [AppRoutes.HOME]: "/",
  [AppRoutes.NOT_FOUND]: getNotFound(),
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <Navigate to={RoutePath.workout} replace />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
  },
  [AppRoutes.REGISTER]: {
    path: RoutePath.register,
    element: <RegisterPage />,
  },
  [AppRoutes.SETTINGS]: {
    path: RoutePath.settings,
    element: <SettingsPage />,
  },
  [AppRoutes.WORKOUT]: {
    path: RoutePath.workout,
    element: <TrainingPage />,
  },
  [AppRoutes.ADD_EXERCISE]: {
    path: RoutePath.add_exercise,
    element: <AddExercisePage />,
    children: [
      {
        path: getAddExercise(),
        element:
          <Content>
            <CategoriesCard />
            <ExercisesCategoryCard />
          </Content>
      },
      {
        path: getExercisesByCategory(":categoryId"),
        element:
          <Content>
            <CategoriesCard />
            <ExercisesCategoryCard />
          </Content>
      },
      {
        path: getExercisesBySearch(),
        element:
          <Content>
            <ExercisesSearchCard />
          </Content>
      },
    ],
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
