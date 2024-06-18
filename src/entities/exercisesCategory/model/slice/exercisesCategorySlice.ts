import { createSlice } from "@reduxjs/toolkit";
import { fetchExercisesCategory } from "../../api/fetchExercisesCategory";
import { IExercisesCategoryState } from "../../types/types"

const initialState: IExercisesCategoryState = {
    categories: [],
    error: null,
    loading: false,
    currentCategory: null,
}

export const exercisesCategorySlice = createSlice({
    name: "exercises",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExercisesCategory.fulfilled, (state, action) => {
                state.categories = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchExercisesCategory.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchExercisesCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default exercisesCategorySlice.reducer