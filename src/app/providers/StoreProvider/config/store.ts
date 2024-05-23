import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducer } from 'entities/Auth/index';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});