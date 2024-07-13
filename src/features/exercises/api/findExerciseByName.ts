import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where, startAt, endAt } from 'firebase/firestore';
import { db } from 'shared/services/firebase/firebase';
import { IExercise } from '../types/types';

export const findExerciseByName = createAsyncThunk<IExercise[], { userId: string, namePrefix: string }, { rejectValue: string }>(
    'findExerciseByName',
    async ({ userId, namePrefix }, { rejectWithValue }) => {
        try {
            // Проверка на пустое поле инпута
            if (!namePrefix.trim()) {
                console.log("Поле инпута пустое. Поиск не выполняется.");
                return null; // Возвращаем пустой массив, если поле инпута пустое
            }

            // Преобразуем префикс имени в нижний и верхний регистр для поиска независимо от регистра
            const lowercasePrefix = namePrefix.toLowerCase();
            const uppercasePrefix = namePrefix.toUpperCase();

            // Создаем ссылку на коллекцию упражнений для указанного пользователя
            const exercisesCollectionRef = collection(db, `users/${userId}/exercises`);

            // Формируем запрос для поиска упражнений, имена которых начинаются с namePrefix (независимо от регистра)
            const exerciseQuery = query(exercisesCollectionRef,
                where('name', '>=', lowercasePrefix),
                where('name', '<=', lowercasePrefix + '\uf8ff')
            );
            const querySnapshot = await getDocs(exerciseQuery);

            // Проверяем, найдены ли упражнения с заданным префиксом
            if (querySnapshot.empty) {
                console.log(`Упражнения, начинающиеся с '${namePrefix}', не найдены`);
                return []; // Возвращаем пустой массив, если упражнения не найдены
            }

            // Если упражнения найдены, собираем их данные в массив
            const exercises: IExercise[] = querySnapshot.docs.map(doc => doc.data() as IExercise);
            console.log('Найденные упражнения:', exercises);
            return exercises;
        } catch (error: any) {
            console.error('Ошибка при поиске упражнений: ', error);
            return rejectWithValue(error.message);
        }
    }
);
