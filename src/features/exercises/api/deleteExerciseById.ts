import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, deleteDoc, doc, getDoc } from 'shared/services/firebase/firebase';
import { IExercise } from '../types/types';

export const deleteExerciseById = createAsyncThunk(
    'exercises/deleteExercise',
    async ({ exerciseId, userId }: { exerciseId: string; userId: string }, { rejectWithValue }) => {
        try {
            const exerciseDocRef = doc(db, `users/${userId}/exercises/${exerciseId}`);

            const exerciseDocSnap = await getDoc(exerciseDocRef);

            if (!exerciseDocSnap.exists()) {
                throw new Error(`Упражнение с id ${exerciseId} не найдено`);
            }

            await deleteDoc(exerciseDocRef);

            console.log(`Упражнение с id ${exerciseId} успешно удалено`);

            return exerciseId
        } catch (error) {
            console.error('Ошибка при удалении упражнения: ', error);
            return rejectWithValue(error.message);
        }
    }
);
