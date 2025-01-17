import dayjs from "dayjs";
const today = dayjs();

export const getLogin = () => '/login';
export const getRegister = () => '/register';
export const getWorkout = () => '/workout';
export const getAddExercise = () => '/add-exercise'
export const getDate = (date: string = today.format('YYYY-MM-DD')) => `/workout/${date}`
export const getExercisesByCategory = (categoryId: string) => `/add-exercise/category/${categoryId}`;
export const getExercisesBySearch = () => `/add-exercise/search`;

export const getSettings = () => '/settings'
export const getFeedback = () => '/https://t.me/walkerman_on'
export const getNotFound = () => '*';