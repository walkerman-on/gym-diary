import { AppRoutesProps } from './types';
import { getAccount, getAddExercise, getAddExerciseofCategory, getCreateExercise, getCreateExerciseofCategory, getLogin, getNotFound, getRegister, getTraining } from './routes';
import { LoginPage } from 'pages/login';
import { RegisterPage } from 'pages/register';
import { TrainingPage } from 'pages/training';
import { NotFoundPage } from 'pages/notFound';
import { AddExercisePage } from 'pages/add-exercise';
import { CreateExerciseofCategoryPage } from 'pages/createExerciseofCategory';
import { CreateExercisePage } from 'pages/createExercise';
import { AddExerciseOfCategoryPage } from 'pages/addExerciseOfCategory';

export enum AppRoutes {
  LOGIN = 'login',
  REGISTER = 'register',
  TRAINING = 'training',
  ADD_EXERCISE = 'add_exercise',
  ADD_EXERCISE_OF_CATEGORY = 'add_exercise_of_category',
  CREATE_EXERCISE = 'create_exercise',
  CREATE_EXERCISE_OF_CATEGORY = 'create_exercise_of_category',
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: getLogin(),
  [AppRoutes.REGISTER]: getRegister(),
  [AppRoutes.TRAINING]: getTraining(),
  [AppRoutes.ADD_EXERCISE]: getAddExercise(),
  [AppRoutes.ADD_EXERCISE_OF_CATEGORY]: `/add-exercise/category/:categoryId`,
  [AppRoutes.CREATE_EXERCISE]: getCreateExercise(),
  [AppRoutes.CREATE_EXERCISE_OF_CATEGORY]: `/create-exercise/category/:categoryId`,
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
  [AppRoutes.ADD_EXERCISE_OF_CATEGORY]: {
    path: RoutePath.add_exercise_of_category,
    element: <AddExerciseOfCategoryPage />,
  },
  [AppRoutes.CREATE_EXERCISE]: {
    path: RoutePath.create_exercise,
    element: <CreateExercisePage />,
  },
  [AppRoutes.CREATE_EXERCISE_OF_CATEGORY]: {
    path: RoutePath.create_exercise_of_category,
    element: <CreateExerciseofCategoryPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
