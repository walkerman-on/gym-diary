import { AppRoutesProps } from './types';
import { getAddExercise, getCreateExercise, getLogin, getNotFound, getRegister, getTraining } from './routes';
import { LoginPage } from 'pages/login';
import { RegisterPage } from 'pages/register';
import { TrainingPage } from 'pages/training';
import { NotFoundPage } from 'pages/not-found';
import { AddExercisePage } from 'pages/add-exercise';
import { CreateExercisePage } from 'pages/create-exercise';

export enum AppRoutes {
  LOGIN = 'login',
  REGISTER = 'register',
  TRAINING = 'training',
  ADD_EXERCISE = 'add_exercise',
  CREATE_EXERCISE = 'create_exercise',
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: getLogin(),
  [AppRoutes.REGISTER]: getRegister(),
  [AppRoutes.TRAINING]: getTraining(),
  [AppRoutes.ADD_EXERCISE]: getAddExercise(),
  [AppRoutes.CREATE_EXERCISE]: getCreateExercise(),
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
  [AppRoutes.CREATE_EXERCISE]: {
    path: RoutePath.create_exercise,
    element: <CreateExercisePage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
