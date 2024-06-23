import { createAsyncThunk } from '@reduxjs/toolkit';
import { IExercise } from 'entities/exercisesCategory';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'shared/services/firebase/firebase';

export const findExerciseByName = createAsyncThunk<IExercise[], { userId: string, namePrefix: string }, { rejectValue: string }>(
    'findExerciseByName',
    async ({ userId, namePrefix }, { rejectWithValue }) => {
        try {
            // Создаем ссылку на коллекцию упражнений для указанного пользователя
            const exercisesCollectionRef = collection(db, `users/${userId}/exercises`);

            // Формируем запрос для поиска упражнений, имена которых начинаются с namePrefix
            const startAtPrefix = namePrefix;
            const endAtPrefix = namePrefix + '\uf8ff'; // Unicode символ, следующий за всеми другими символами

            const exerciseQuery = query(exercisesCollectionRef, where('name', '>=', startAtPrefix), where('name', '<=', endAtPrefix));
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
