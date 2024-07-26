import { createSlice } from '@reduxjs/toolkit';
import { IExercisesCategoryState } from '../../types/types';
import { findExerciseByName } from '../../api/findExerciseByName';
import { fetchSelectedExercises } from 'features/exercises/api/fetchSelectedExercises';
import { deleteExerciseById } from 'features/exercises/api/deleteExerciseById';

const initialState: IExercisesCategoryState = {
    error: null,
    loading: false,
    exercise__search: null,
    exercises__selected: null
};

export const exercisesSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(findExerciseByName.fulfilled, (state, action) => {
                state.exercise__search = action.payload;
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

            .addCase(fetchSelectedExercises.fulfilled, (state, action) => {
                state.exercises__selected = action.payload;
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


    },
});


export default exercisesSlice.reducer;
