import { createSlice } from "@reduxjs/toolkit";
import { IWorkoutState } from "../../types/types"
import { fetchDateCurrent } from "features/calendar";
import { fetchSelectedExercises } from "features/exercises";

const initialState: IWorkoutState = {
    workout__current: {
        data: null,
        exercises: null
    },
    loading: false,
    error: null,
}

export const workoutSlice = createSlice({
    name: "workout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(fetchDateCurrent.fulfilled, (state, action) => {
            //     state.workout__current.data = action.payload
            //     state.loading = false
            //     state.error = null
            // })
            // .addCase(fetchDateCurrent.pending, (state) => {
            //     state.loading = true
            //     state.error = null
            // })
            // .addCase(fetchDateCurrent.rejected, (state, action) => {
            //     state.loading = false
            //     state.error = action.payload
            // })

            .addCase(fetchSelectedExercises.fulfilled, (state, action) => {
                console.log('Payload:', action.payload);
                state.workout__current.exercises = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchSelectedExercises.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSelectedExercises.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default workoutSlice.reducer