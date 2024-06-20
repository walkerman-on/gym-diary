import { createSlice } from "@reduxjs/toolkit";
import { WorkoutState } from "../types/workout";
import { addWorkout } from "entities/workout/api/addWorkout";

const initialState: WorkoutState = {
    workout: null,
    error: null,
    loading: false,
}

export const workoutSlice = createSlice({
    name: "workoutSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addWorkout.fulfilled, (state, action) => {
                state.workout = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(addWorkout.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addWorkout.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default workoutSlice.reducer