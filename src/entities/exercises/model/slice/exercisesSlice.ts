import { createSlice } from '@reduxjs/toolkit';
import { IExercisesCategoryState } from '../../types/types';
import { findExerciseByName } from '../../api/findExerciseByName';
import { selectExerciseById } from 'entities/exercises/api/selectExerciseById';
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
        toggleExerciseSelected: (state, action) => {
            const exerciseId = action.payload;
            const exercise = state?.exercises?.find(item => item.id === exerciseId);
            if (exercise) {
                exercise.selected = !exercise.selected;
            }
        },
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

            .addCase(selectExerciseById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Обновление состояния выполняется в toggleExerciseSelected
            })
            .addCase(selectExerciseById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(selectExerciseById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { toggleExerciseSelected } = exercisesSlice.actions;

export default exercisesSlice.reducer;
