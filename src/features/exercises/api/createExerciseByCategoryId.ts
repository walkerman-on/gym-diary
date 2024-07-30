import { createAsyncThunk } from '@reduxjs/toolkit';
import uniqid from 'uniqid';
import { db, setDoc, doc, collection, query, where, getDocs } from 'shared/services/firebase';
import { IExercise } from 'features/exercises';
import { RootState } from "app/providers/store-provider";

interface CreateExerciseArgs {
    categoryID: string;
    exerciseName: string;
}

export const createExerciseByCategoryId = createAsyncThunk(
    'exercises/createExercise',
    async ({ categoryID, exerciseName }: CreateExerciseArgs, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState;
            const userId = state.user.user?.id; // Adjust according to your state shape

            if (!userId) {
                return rejectWithValue('User not authenticated');
            }


            const exercisesCollectionRef = collection(db, `users/${userId}/exercises`);

            const exerciseQuery = query(exercisesCollectionRef, where('name', '==', exerciseName));
            const querySnapshot = await getDocs(exerciseQuery);

            if (!querySnapshot.empty) {
                console.log(`Exercise with name '${exerciseName}' already exists`);
                return rejectWithValue(`Exercise with name '${exerciseName}' already exists`);
            }

            const exerciseID = uniqid();
            const exerciseDocRef = doc(exercisesCollectionRef, exerciseID);

            const exerciseDataToSave = {
                name: exerciseName.toLowerCase(),
                id: exerciseID,
                categoryId: categoryID,
                selected: false
            } as IExercise;

            await setDoc(exerciseDocRef, exerciseDataToSave);

            return exerciseDataToSave;

        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
