import { AppRoutesProps } from './types';
import { getAccount, getAddExercise, getLogin, getNotFound, getRegister, getTraining } from './routes';
import { LoginPage } from 'pages/login';
import { RegisterPage } from 'pages/register';
import { TrainingPage } from 'pages/training';
import { NotFoundPage } from 'pages/notFound';
import { AddExercisePage } from 'pages/addExercise';

export enum AppRoutes {
  LOGIN = 'login',
  REGISTER = 'register',
  TRAINING = 'training',
  ADD_EXERCISE = 'add_exercise',
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: getLogin(),
  [AppRoutes.REGISTER]: getRegister(),
  [AppRoutes.TRAINING]: getTraining(),
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
   [AppRoutes.TRAINING]: {
    path: RoutePath.training,
    element: <TrainingPage />,
  },
   [AppRoutes.ADD_EXERCISE]: {
    path: RoutePath.add_exercise,
    element: <AddExercisePage />,
  },
   [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
