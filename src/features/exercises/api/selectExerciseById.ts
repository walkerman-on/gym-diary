import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, doc, updateDoc, getDoc } from 'shared/services/firebase';
import { RootState } from "app/providers/store-provider";

interface SelectExerciseByIdArgs {
    exerciseID: string;
}

export const selectExerciseById = createAsyncThunk<
    string,
    SelectExerciseByIdArgs,
    { rejectValue: string }
>(
    'exercises/selectExerciseById',
    async ({ exerciseID }, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState;
            const userId = state.user.user?.id;

            if (!userId) {
                return rejectWithValue('User not authenticated');
            }

            const exerciseDocRef = doc(db, `users/${userId}/exercises/${exerciseID}`);

            const exerciseDocSnapshot = await getDoc(exerciseDocRef);
            if (!exerciseDocSnapshot.exists()) {
                throw new Error(`Упражнение с ID ${exerciseID} не найдено`);
            }

            const currentSelected = exerciseDocSnapshot.data().selected;

            await updateDoc(exerciseDocRef, {
                selected: !currentSelected,
            });

            console.log(`Упражнение с ID ${exerciseID} успешно обновлено`);
            return exerciseID;

        } catch (error: any) {
            console.error('Ошибка при обновлении упражнения: ', error);
            return rejectWithValue(error.message);
        }
    }
);
