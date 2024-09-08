import { createSlice } from "@reduxjs/toolkit";
import { IExerciseWorkout, IWorkoutState } from "../../types/types";
import { addWorkout } from "features/workout/api/addWorkout";
import { fetchWorkout } from "features/workout/api/fetchWorkout";
import { selectExerciseForWorkout } from "features/workout/api/selectExerciseForWorkout";
import { createWorkout } from "features/workout/api/createWorkout";
import { deleteWorkout } from "features/workout/api/deleteWorkout";

const initialState: IWorkoutState = {
    workout__current: {
        date: null,
        exercises: []
    },
    loading: false,
    error: null
};

export const workoutSlice = createSlice({
    name: "workout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addWorkout.fulfilled, (state, action) => {
                state.workout__current.date = action.payload.date;
                state.workout__current.exercises = action.payload.exercises;
                state.loading = false;
                state.error = null;
            })
            .addCase(addWorkout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addWorkout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(selectExerciseForWorkout.fulfilled, (state, action) => {
                const newExercise: IExerciseWorkout = {
                    exercise: action.payload,
                    sets: []
                };
                state.workout__current.exercises = [
                    ...state.workout__current.exercises,
                    newExercise
                ];
                state.loading = false;
                state.error = null;
            })
            .addCase(selectExerciseForWorkout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(selectExerciseForWorkout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchWorkout.fulfilled, (state, action) => {
                state.workout__current.date = action.payload.date;
                state.workout__current.exercises = action.payload.exercises;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchWorkout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createWorkout.fulfilled, (state, action) => {
                state.workout__current.date = action.payload.date;
                state.workout__current.exercises = [
                    ...state.workout__current.exercises,
                    action.payload.exercise
                ];
                state.loading = false;
                state.error = null;
            })
            .addCase(createWorkout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createWorkout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteWorkout.fulfilled, (state, action) => {
                state.workout__current.exercises = state.workout__current.exercises.filter(
                    (exerciseWorkout: IExerciseWorkout) => exerciseWorkout.exercise?.id !== action.payload
                );
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteWorkout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteWorkout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default workoutSlice.reducer;
