import { createSlice } from '@reduxjs/toolkit';
import { IExercisesCategoryState } from '../../types/types';
import { findExerciseByName } from '../../api/findExerciseByName';
import { fetchAllExercises } from 'entities/exercises/api/fetchAllExercises';

const initialState: IExercisesCategoryState = {
    error: null,
    loading: false,
    exercises: null,
    selectedExercises: null
};

export const exercisesSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllExercises.fulfilled, (state, action) => {
                state.exercises = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchAllExercises.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllExercises.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(findExerciseByName.fulfilled, (state, action) => {
                state.exercises = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(findExerciseByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(findExerciseByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export default exercisesSlice.reducer;
