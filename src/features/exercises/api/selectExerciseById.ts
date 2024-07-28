import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from 'shared/services/firebase/firebase';
import { RootState } from "app/providers/StoreProvider"; // Убедитесь, что путь правильный

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
            const userId = state.user.user?.id; // Проверьте корректность пути к идентификатору пользователя

            if (!userId) {
                return rejectWithValue('User not authenticated');
            }

            // Создаем ссылку на документ упражнения для указанного пользователя и exerciseId
            const exerciseDocRef = doc(db, `users/${userId}/exercises/${exerciseID}`);

            // Получаем текущее значение поля selected
            const exerciseDocSnapshot = await getDoc(exerciseDocRef);
            if (!exerciseDocSnapshot.exists()) {
                throw new Error(`Упражнение с ID ${exerciseID} не найдено`);
            }

            const currentSelected = exerciseDocSnapshot.data().selected;

            // Обновляем документ, устанавливая поле selected в противоположное значение
            await updateDoc(exerciseDocRef, {
                selected: !currentSelected,
            });

            console.log(`Упражнение с ID ${exerciseID} успешно обновлено`);
            return exerciseID; // Возвращаем exerciseId в случае успешного обновления
        } catch (error: any) {
            console.error('Ошибка при обновлении упражнения: ', error);
            return rejectWithValue(error.message); // Возвращаем сообщение об ошибке в случае неудачи
        }
    }
);
