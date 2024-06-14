import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workout, WorkoutState } from '../types/workout';

const initialState: WorkoutState = {
  userID: null,
  workout: null
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    addWorkout(state: WorkoutState, { payload }: PayloadAction<Workout>) {
      state.workout = payload
    }
  }
});

export const { addWorkout } = workoutSlice.actions;

export default workoutSlice.reducer;
