import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, deleteDoc, doc, getDoc } from 'shared/services/firebase';
import { RootState } from "app/providers/store-provider";


interface DeleteExerciseArgs {
    exerciseID: string;
}

export const deleteExerciseById = createAsyncThunk(
    'exercises/deleteExercise',
    async ({ exerciseID }: DeleteExerciseArgs, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState;
            const userId = state.user.user?.id;

            if (!userId) {
                return rejectWithValue('User not authenticated');
            }

            const exerciseDocRef = doc(db, `users/${userId}/exercises/${exerciseID}`);

            const exerciseDocSnap = await getDoc(exerciseDocRef);

            if (!exerciseDocSnap.exists()) {
                throw new Error(`Упражнение с id ${exerciseID} не найдено`);
            }

            await deleteDoc(exerciseDocRef);

            console.log(`Упражнение с id ${exerciseID} успешно удалено`);

            return exerciseID
        } catch (error) {
            console.error('Ошибка при удалении упражнения: ', error);
            return rejectWithValue(error.message);
        }
    }
);
