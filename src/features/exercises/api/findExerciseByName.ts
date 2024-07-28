import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'shared/services/firebase/firebase';
import { IExercise } from '../types/types';
import { RootState } from "app/providers/StoreProvider"; // Убедитесь, что путь правильный

interface FindExerciseByNameArgs {
    exerciseName: string;
}

export const findExerciseByName = createAsyncThunk<
    IExercise[], // Тип данных, возвращаемых функцией
    FindExerciseByNameArgs, // Тип аргументов функции
    { rejectValue: string } // Тип для rejectWithValue
>(
    'findExerciseByName',
    async ({ exerciseName }, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState;
            const userId = state.user.user?.id; // Проверьте корректность пути к идентификатору пользователя

            if (!userId) {
                return rejectWithValue('User not authenticated');
            }

            // Проверка на пустое поле инпута
            if (!exerciseName.trim()) {
                console.log("Поле инпута пустое. Поиск не выполняется.");
                return []; // Возвращаем пустой массив
            }

            // Создаем ссылку на коллекцию упражнений для указанного пользователя
            const exercisesCollectionRef = collection(db, `users/${userId}/exercises`);

            // Формируем запрос для поиска упражнений, имена которых начинаются с exerciseName
            const exerciseQuery = query(
                exercisesCollectionRef,
                where('name', '>=', exerciseName),
                where('name', '<=', exerciseName + '\uf8ff') // '\uf8ff' - это высокий символ, чтобы охватить все возможные продолжения
            );

            const querySnapshot = await getDocs(exerciseQuery);

            // Проверяем, найдены ли упражнения с заданным префиксом
            if (querySnapshot.empty) {
                console.log(`Упражнения, начинающиеся с '${exerciseName}', не найдены`);
                return []; // Возвращаем пустой массив
            }

            // Если упражнения найдены, собираем их данные в массив
            const exercises: IExercise[] = querySnapshot.docs.map(doc => ({
                ...doc.data() as IExercise,
                id: doc.id // Если вам нужен id документа
            }));
            console.log('Найденные упражнения:', exercises);
            return exercises;
        } catch (error) {
            console.error('Ошибка при поиске упражнений: ', error);
            return rejectWithValue('Ошибка при поиске упражнений');
        }
    }
);
