export const getLogin = () => '/login';
export const getRegister = () => '/register';
export const getTraining = () => '/training';
export const getAddExercise = () => '/add-exercise';
export const getAddExerciseofCategory = (categoryId: string) => `/add-exercise/category/${categoryId}`;;
export const getCreateExercise = () => '/create-exercise';
export const getCreateExerciseofCategory = (categoryId: string) => `/create-exercise/category/${categoryId}`;
export const getAccount = () => '/account'
export const getNotFound = () => '*';