import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from 'shared/services/firebase/firebase';

export const selectExerciseById = createAsyncThunk<
    string, // Возвращаемый тип будет id упражнения
    { userId: string, exerciseId: string }, // Входные параметры - userId и exerciseId
    { rejectValue: string }
>(
    'exercises/selectExerciseById',
    async ({ userId, exerciseId }, { rejectWithValue }) => {
        try {
            // Создаем ссылку на документ упражнения для указанного пользователя и exerciseId
            const exerciseDocRef = doc(db, `users/${userId}/exercises/${exerciseId}`);

            // Получаем текущее значение поля selected
            const exerciseDocSnapshot = await getDoc(exerciseDocRef);
            if (!exerciseDocSnapshot.exists()) {
                throw new Error(`Упражнение с ID ${exerciseId} не найдено`);
            }

            const currentSelected = exerciseDocSnapshot.data().selected;

            // Обновляем документ, устанавливая поле selected в противоположное значение
            await updateDoc(exerciseDocRef, {
                selected: !currentSelected,
            });

            console.log(`Упражнение с ID ${exerciseId} успешно обновлено`);
            return exerciseId; // Возвращаем exerciseId в случае успешного обновления
        } catch (error: any) {
            console.error('Ошибка при обновлении упражнения: ', error);
            return rejectWithValue(error.message); // Возвращаем сообщение об ошибке в случае неудачи
        }
    }
);
