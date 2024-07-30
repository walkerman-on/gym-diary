import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, collection, getDocs, query, where } from 'shared/services/firebase';
import { IExercise } from '../types/types';
import { RootState } from "app/providers/store-provider";

interface FindExerciseByNameArgs {
    exerciseName: string;
}

export const findExerciseByName = createAsyncThunk<
    IExercise[],
    FindExerciseByNameArgs,
    { rejectValue: string }
>(
    'findExerciseByName',
    async ({ exerciseName }, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState;
            const userId = state.user.user?.id;

            if (!userId) {
                return rejectWithValue('User not authenticated');
            }

            if (!exerciseName.trim()) {
                console.log("Поле инпута пустое. Поиск не выполняется.");
                return []
            }

            const exercisesCollectionRef = collection(db, `users/${userId}/exercises`);

            const exerciseQuery = query(
                exercisesCollectionRef,
                where('name', '>=', exerciseName),
                where('name', '<=', exerciseName + '\uf8ff')
            );

            const querySnapshot = await getDocs(exerciseQuery);

            if (querySnapshot.empty) {
                console.log(`Упражнения, начинающиеся с '${exerciseName}', не найдены`);
                return [];
            }

            const exercises: IExercise[] = querySnapshot.docs.map(doc => ({
                ...doc.data() as IExercise,
                id: doc.id
            }));
            console.log('Найденные упражнения:', exercises);

            return exercises;

        } catch (error) {
            console.error('Ошибка при поиске упражнений: ', error);
            return rejectWithValue('Ошибка при поиске упражнений');
        }
    }
);
