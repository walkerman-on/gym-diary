import { createSlice } from "@reduxjs/toolkit";
import { IWorkoutState } from "../../types/types";
import { addWorkout } from "features/workout/api/addWorkout";
import { fetchWorkout } from "features/workout/api/fetchWorkout";

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
                state.workout__current.date = action.payload.date
                state.workout__current.exercises = [...state.workout__current.exercises, action.payload.exercise]
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

            .addCase(fetchWorkout.fulfilled, (state, action) => {
                state.workout__current.date = action.payload.date
                state.workout__current.exercises = action.payload.exercises
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
            });
    },
});

export default workoutSlice.reducer;
