import { AppRoutesProps } from './types';
import { getAccount, getLogin, getNotFound, getRegister, getTraining } from './routes';
import { LoginPage } from 'pages/login';
import { RegisterPage } from 'pages/register';
import { TrainingPage } from 'pages/training';

export enum AppRoutes {
  LOGIN = 'login',
  REGISTER = 'register',
  TRAINING = 'training',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: getLogin(),
  [AppRoutes.REGISTER]: getRegister(),
  [AppRoutes.TRAINING]: getTraining(),
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
};
