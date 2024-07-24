import uniqid from 'uniqid';
import { db, setDoc, doc, collection, query, where, getDocs } from '../../../shared/services/firebase/firebase';
import { IExercise } from 'features/exercises';

import { createAsyncThunk } from '@reduxjs/toolkit';

interface CreateExerciseArgs {
    exercisesCategoryID: string;
    exerciseData: { name: string; userId: string };
}

export const createExercise = createAsyncThunk(
    'exercises/createExercise',
    async ({ exercisesCategoryID, exerciseData }: CreateExerciseArgs, { rejectWithValue }) => {
        try {
            // Создаем ссылку на коллекцию упражнений для указанного пользователя
            const exercisesCollectionRef = collection(db, `users/${exerciseData.userId}/exercises`);

            // Формируем запрос для проверки наличия упражнения с заданным именем
            const exerciseQuery = query(exercisesCollectionRef, where('name', '==', exerciseData.name));
            const querySnapshot = await getDocs(exerciseQuery);

            // Проверяем, есть ли упражнение с заданным именем
            if (!querySnapshot.empty) {
                console.log(`Упражнение с именем '${exerciseData.name}' уже существует`);
                return rejectWithValue(`Exercise with name '${exerciseData.name}' already exists`);
            }

            // Создаем новый документ упражнения с уникальным идентификатором
            const exerciseID = uniqid(); // Предположим, что у вас есть функция для генерации уникального ID
            const exerciseDocRef = doc(exercisesCollectionRef, exerciseID);

            const exerciseDataToSave = {
                name: exerciseData.name,
                id: exerciseID,
                categoryId: exercisesCategoryID,
                selected: false
            } as IExercise;

            await setDoc(exerciseDocRef, exerciseDataToSave);

            return exerciseDataToSave; // Возвращаем созданные данные упражнения

        } catch (error) {
            console.error('Error adding exercise: ', error);
            throw new Error(`Failed to create exercise: ${error.message}`);
        }
    }
);
