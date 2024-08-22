import { AppRoutesProps } from './types';
import { getAddExercise, getDate, getExercisesByCategory, getExercisesBySearch, getLogin, getNotFound, getRegister, getSettings, getTraining } from './routes';
import { LoginPage } from 'pages/login';
import { RegisterPage } from 'pages/register';
import { TrainingPage } from 'pages/training';
import { NotFoundPage } from 'pages/not-found';
import { AddExercisePage } from 'pages/add-exercise';
import { SettingsPage } from 'pages/settings';
import { ExercisesFromCategory } from 'features/exercises/ui/exercises-from-category';
import { ExercisesCategoryCard } from 'widgets/exercises-card/exercises-category-card';
import { CategoriesCard } from 'widgets/categories-card';
import { ExercisesSearchCard } from 'widgets/exercises-card/exercises-search-card';

export enum AppRoutes {
  LOGIN = 'login',
  REGISTER = 'register',
  TRAINING = 'training',
  ADD_EXERCISE = 'add_exercise',
  SETTINGS = "settings",
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: getLogin(),
  [AppRoutes.REGISTER]: getRegister(),
  [AppRoutes.TRAINING]: getDate(":date"),
  [AppRoutes.SETTINGS]: getSettings(),
  [AppRoutes.ADD_EXERCISE]: getAddExercise(),
  [AppRoutes.NOT_FOUND]: getNotFound(),
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
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
  [AppRoutes.TRAINING]: {
    path: RoutePath.training,
    element: <TrainingPage />,
  },
  [AppRoutes.ADD_EXERCISE]: {
    path: RoutePath.add_exercise,
    element: <AddExercisePage />,
    children: [
      {
        path: getAddExercise(),
        element:
          <>
            <CategoriesCard />
            <ExercisesCategoryCard />
          </>
      },
      {
        path: getExercisesByCategory(":categoryId"),
        element:
          <>
            <CategoriesCard />
            <ExercisesCategoryCard />
          </>
      },
      {
        path: getExercisesBySearch(),
        element:
          <>
            <ExercisesSearchCard />
          </>
      },
    ],
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
