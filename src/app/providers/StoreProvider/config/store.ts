import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit';
import { userReducer } from 'entities/Auth/index';
import { UserState } from 'entities/Auth';
import { exercisesCategoryReducer } from 'entities/exercisesCategory';
import { workoutReducer } from 'entities/workout';
// Функция для загрузки состояния из localStorage
const loadState = (): UserState | undefined => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as UserState;
  } catch (err) {
    console.error("Could not load state from localStorage:", err);
    return undefined;
  }
};

// Middleware для сохранения состояния в localStorage
const persistUserMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState();

  if (state.user) {
    try {
      const serializedState = JSON.stringify(state.user);
      localStorage.setItem('user', serializedState);
    } catch (err) {
      console.error("Could not save state to localStorage:", err);
    }
  }

  return result;
};

// Загружаем состояние пользователя из localStorage
const preloadedState = {
  user: loadState(),
};

const rootReducer = combineReducers({
  user: userReducer,
  exercisesCategory: exercisesCategoryReducer,
  // workout: workoutReducer
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persistUserMiddleware),
});

